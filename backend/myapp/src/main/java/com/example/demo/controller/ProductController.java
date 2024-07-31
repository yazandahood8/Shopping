package com.example.demo.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public List<Product> getAllProducts() {
        try {
            return productRepository.findAll();
        } catch (Exception e) {
            logger.error("Error retrieving products", e);
            throw new RuntimeException("Error retrieving products", e);
        }
    }

    @PostMapping("/addProduct")
    public Product createProduct(@RequestBody Product product) {
        try {
            return productRepository.save(product);
        } catch (Exception e) {
            logger.error("Error creating product", e);
            throw new RuntimeException("Error creating product", e);
        }
    }
}
