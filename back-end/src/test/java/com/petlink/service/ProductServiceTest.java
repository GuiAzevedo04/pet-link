package com.petlink.service;

import com.petlink.data.dto.ProductResponseDTO;
import com.petlink.data.entity.Product;
import com.petlink.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    private Product product;
    private ProductResponseDTO productDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Produto existente (simulando banco)
        product = new Product(1L, "Comida de Cachorro", "Comida de cachorro premium", 20.0, 10, "link_da_imagem");

        // ProductDTO sem o id (como em um request)
        productDTO = new ProductResponseDTO(null, "Comida de Cachorro", 20.0, "Comida de cachorro premium", 10, "link_da_imagem");
    }

    @Test
    void testCreateProduct() {
        // Simulando salvar o produto
        Product savedProduct = new Product(1L, "Comida de Cachorro", "Comida de cachorro premium", 20.0, 10, "link_da_imagem");

        when(productRepository.save(any(Product.class))).thenReturn(savedProduct);

        ProductResponseDTO createdProduct = productService.createProduct(productDTO);

        assertNotNull(createdProduct);
        assertNotNull(createdProduct.getId());
        assertEquals("Comida de Cachorro", createdProduct.getName());

        // Verificando se foi criado
        verify(productRepository, times(1)).save(any(Product.class));
    }

    @Test
    void testUpdateProduct() {
        // Encontrando produto
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        when(productRepository.save(any(Product.class))).thenReturn(product);

        // Criando um DTO de Produto como em um request
        ProductResponseDTO updatedDTO = new ProductResponseDTO(null, "Comida de Gato", 25.0, "Comida de gato premium", 5, "novo_link_da_imagem");
        // Atualizando Produto
        ResponseEntity<?> response = productService.updateProduct(1L, updatedDTO);

        // Testando update
        ProductResponseDTO updatedProduct = (ProductResponseDTO) response.getBody();
        assertNotNull(updatedProduct);
        assertEquals("Comida de Gato", updatedProduct.getName());
        assertEquals(25.0, updatedProduct.getPrice());
        assertEquals("Comida de gato premium", updatedProduct.getDescription());
        assertEquals("novo_link_da_imagem", updatedProduct.getImageLink());
        assertEquals(5, updatedProduct.getAmount());

        // Verificando
        verify(productRepository, times(1)).findById(1L);
        verify(productRepository, times(1)).save(any(Product.class));
    }

    @Test
    void testDeleteProduct() {

        // Achando produto no banco de dados
        when(productRepository.existsById(1L)).thenReturn(true);
        doNothing().when(productRepository).deleteById(1L);

        // Apagando produto
        assertDoesNotThrow(() -> productService.deleteProduct(1L));

        // Verificando
        verify(productRepository, times(1)).existsById(1L);
        verify(productRepository, times(1)).deleteById(1L);
    }

    @Test
    void testDeleteProduct_NotFound() {

        when(productRepository.existsById(1L)).thenReturn(false);

        Exception exception = assertThrows(RuntimeException.class, () -> productService.deleteProduct(1L));
        assertEquals("Produto não encontrado com o ID: 1", exception.getMessage());

        verify(productRepository, times(1)).existsById(1L);
        verify(productRepository, never()).deleteById(anyLong());
    }
}
