package com.petlink.data.dto;

import com.petlink.data.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class ProductResponseDTO {
    private Long id;
    private String name;
    private double price;
    private String description;
    private int amount;
    private String imageLink;


    public ProductResponseDTO(Product entity){

        this.setId(entity.getIdProduct());
        this.setName(entity.getName());
        this.setPrice(entity.getPrice());
        this.setDescription(entity.getDescription());
        this.setImageLink(entity.getImage_link());
        this.setAmount(entity.getAmount());
    }

    public ProductResponseDTO(){

    }
}