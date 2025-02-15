package com.petlink.service;

import com.petlink.data.dto.ProductResponseDTO;
import com.petlink.data.entity.Product;
import com.petlink.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<ProductResponseDTO> getAllProducts(){
        return productRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    public ProductResponseDTO createProduct(ProductResponseDTO productResponse){
        Product produto = toEntity(productResponse);
        Product saveProduct = productRepository.save(produto);

        return toDto(saveProduct);

    }

    public ProductResponseDTO getProductById(Long id) {
        Product product = productRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Produto não encontrado com o ID: " + id)
        );

        return toDto(product);
    }

    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Produto não encontrado com o ID: " + id);
        }
        productRepository.deleteById(id);
    }

    public ResponseEntity<?> updateProduct(Long id, ProductResponseDTO productDto) {
        Product product = productRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Produto não encontrado com o ID: " + id)
        );

        if(productDto.getName() != null){
            product.setName(productDto.getName());
        }

        if(productDto.getPrice() >= 1){
            product.setPrice(productDto.getPrice());
        }

        if(productDto.getDescription() != null){
            product.setDescription(productDto.getDescription());
        }

        if(productDto.getImageLink() != null){
            product.setImage_link(productDto.getImageLink());
        }

        if(productDto.getAmount() > -1){
            product.setAmount(productDto.getAmount());
        }

        productRepository.save(product);

        return ResponseEntity.status(HttpStatus.OK).body(toDto(product));

    }

    private ProductResponseDTO toDto(Product entity){
        ProductResponseDTO product = new ProductResponseDTO();
        product.setId(entity.getIdProduct());
        product.setName(entity.getName());
        product.setPrice(entity.getPrice());
        product.setDescription(entity.getDescription());
        product.setAmount(entity.getAmount());
        product.setImageLink(entity.getImage_link());

        return product;
    }

    private Product toEntity(ProductResponseDTO dto) {
        Product product = new Product();
        product.setIdProduct(dto.getId());
        product.setName(dto.getName());
        product.setPrice(dto.getPrice());
        product.setDescription(dto.getDescription());
        product.setImage_link(dto.getImageLink());
        product.setAmount(dto.getAmount());
        return product;
    }
}
