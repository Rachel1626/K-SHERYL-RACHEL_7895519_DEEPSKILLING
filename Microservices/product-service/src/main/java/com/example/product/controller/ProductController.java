package com.example.product.controller;

import com.example.product.model.Product;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final List<Product> products = new ArrayList<>(List.of(
            new Product(1L, "Laptop", 999.99, "High-performance laptop"),
            new Product(2L, "Phone", 599.99, "Latest smartphone")
    ));

    @GetMapping
    public List<Product> getAllProducts() {
        return products;
    }

    @GetMapping("/{id}")
    public Product getProduct(@PathVariable Long id) {
        return products.stream().filter(p -> p.getId().equals(id)).findFirst().orElse(null);
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        product.setId((long) (products.size() + 1));
        products.add(product);
        return product;
    }
}
