package com.petlink.data.dto;

import lombok.Data;

@Data
public class ProductResponseDTO {
    private Long id;
    private String name;
    private double price;
    private String description;
    private String imageLink;
}