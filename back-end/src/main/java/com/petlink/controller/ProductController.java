package com.petlink.controller;


import com.petlink.data.dto.ProductResponseDTO;
import com.petlink.data.entity.Product;
import com.petlink.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/produto")

@RestController
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/all")
    public ResponseEntity<List<ProductResponseDTO>> getAllProducts(){
        return ResponseEntity.status(HttpStatus.OK).body(productService.getAllProducts());
    }

    @GetMapping("/{idProduct}")
    public ResponseEntity<ProductResponseDTO> getAllProducts(@PathVariable Long idProduct){
        return ResponseEntity.status(HttpStatus.OK).body(productService.getProductById(idProduct));
    }

    @PostMapping("/create")
    public ResponseEntity<ProductResponseDTO> createProduct(@RequestBody ProductResponseDTO productDTO){
        ProductResponseDTO createdProduct = productService.createProduct(productDTO);
        return ResponseEntity.ok(createdProduct);

    }

    @DeleteMapping("/{idProduct}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long idProduct){
        return ResponseEntity.status(HttpStatus.OK).body("Produto "+ idProduct+ " deletado com sucesso");

    }



}
