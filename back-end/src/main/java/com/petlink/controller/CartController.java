package com.petlink.controller;

import com.petlink.data.dto.CartResponseDTO;
import com.petlink.data.entity.User;
import com.petlink.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/carrinho")
@RestController
public class CartController {
    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<?> addItemToCart(@RequestParam Long productId, @RequestParam int quantity) {

            System.out.println("CHEGOU A REQUISIÇÃO");
            User userLogged = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            CartResponseDTO cart = cartService.addItemToCart(userLogged.getId_user(), productId, quantity);
            return ResponseEntity.ok().body(cart);

    }

    @GetMapping
    public ResponseEntity<?> getCart(){

        User userLogged = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(cartService.getCart(userLogged));
    }

    @DeleteMapping
    public ResponseEntity<?> deleteProductItem(@RequestParam Long productId){
        User userLogged = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        CartResponseDTO cart = cartService.removeItemFromCart(userLogged.getId_user(), productId);

        return ResponseEntity.ok().body(cart);
    }

    @PutMapping("/clear")
    public ResponseEntity<?> clearCart(){
        User userLogged = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        CartResponseDTO cart = cartService.clearCart(userLogged);

        return ResponseEntity.ok().body(cart);

    }
}
