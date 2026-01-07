
package com.example.catalog.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class CatalogController {
    @GetMapping("/products")
    public List<Map<String, Object>> products() {
        return List.of(
            Map.of("id", 1, "name", "Laptop", "price", 1200),
            Map.of("id", 2, "name", "Mouse", "price", 25),
            Map.of("id", 3, "name", "Keyboard", "price", 45)
        );
    }
}
