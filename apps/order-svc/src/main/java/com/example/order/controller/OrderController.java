
package com.example.order.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class OrderController {
    @GetMapping("/orders")
    public List<Map<String, Object>> orders() {
        return List.of(
            Map.of("id", 1, "item", "Laptop", "qty", 1),
            Map.of("id", 2, "item", "Mouse", "qty", 2)
        );
    }
}
