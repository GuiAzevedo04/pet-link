package com.petlink.data.dto;

import com.petlink.data.entity.Cart;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartResponseDTO {
    private Long idCart;
    private Long userId;
    private List<CartItemResponseDTO> items;

    public CartResponseDTO(Cart cart){

        this.idCart = cart.getIdCart();
        this.userId = cart.getUser().getId_user();
        this.items = cart.getItems().stream().map(CartItemResponseDTO::new).collect(Collectors.toList());
    }
}
