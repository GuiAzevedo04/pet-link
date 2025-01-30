package com.petlink.data.dto;

import com.petlink.data.entity.CartItem;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItemResponseDTO {
    private Long idCartItem;
    private Long cartId;
    private ProductResponseDTO product;
    private int quantity;

    public CartItemResponseDTO(CartItem cartItem){
        this.idCartItem = cartItem.getIdCartItem();
        this.cartId = cartItem.getCart().getIdCart();
        this.product = new ProductResponseDTO(cartItem.getProduct());
        this.quantity = cartItem.getQuantity();
    }
}
