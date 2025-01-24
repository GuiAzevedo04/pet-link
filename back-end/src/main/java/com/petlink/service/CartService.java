package com.petlink.service;

import com.petlink.data.dto.CartResponseDTO;
import com.petlink.data.entity.Cart;
import com.petlink.data.entity.CartItem;
import com.petlink.data.entity.Product;
import com.petlink.data.entity.User;
import com.petlink.repository.CartRepository;
import com.petlink.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserService userService;

    public Cart getCartOrCreate(Long userId) {
        User user = userService.getUserById(userId);
        return cartRepository.findByUser(user).orElseGet(() -> {
            Cart novoCarrinho = new Cart();
            novoCarrinho.setUser(user);
            novoCarrinho.setItems(new ArrayList<>());
            return cartRepository.save(novoCarrinho);
        });
    }

    public CartResponseDTO addItemToCart(Long userId, Long productId, Integer quantity) {

        Cart cart = getCartOrCreate(userId);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (product.getAmount() < quantity) {
            throw new IllegalStateException("Insufficient product quantity");
        }

        System.out.println("tem o suficiente");


        CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setProduct(product);

            product.setAmount(product.getAmount()-quantity);
            newItem.setQuantity(quantity);
            newItem.setCart(cart);

            cart.getItems().add(newItem);

        productRepository.save(product);
        return new CartResponseDTO(cartRepository.save(cart));

    }

    public CartResponseDTO getCart(User user) {
        return new CartResponseDTO(cartRepository.findByUser(user).orElseThrow());
    }

    public CartResponseDTO removeItemFromCart(Long userId, Long productId) {
        User user = userService.getUserById(userId);
        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new EntityNotFoundException("Cart not found"));

        Iterator<CartItem> iterator = cart.getItems().iterator();
        while (iterator.hasNext()) {
            CartItem item = iterator.next();
            if (item.getProduct().getIdProduct().equals(productId)) {
                iterator.remove();
                break;
            }
        }

        Cart updatedCart = cartRepository.save(cart);
        return new CartResponseDTO(updatedCart);
    }

    public CartResponseDTO clearCart(User user) {
        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new EntityNotFoundException("Cart not found"));

        cart.getItems().clear();
        return new CartResponseDTO(cartRepository.save(cart));
    }
}
