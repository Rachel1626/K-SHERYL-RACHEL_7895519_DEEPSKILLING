package com.example.order.controller;

import com.example.order.model.Order;
import com.example.order.service.UserClient;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final UserClient userClient;
    private final List<Order> orders = new ArrayList<>(List.of(
            new Order(1L, "Laptop", 1, 999.99, "alice@example.com"),
            new Order(2L, "Phone", 2, 599.99, "bob@example.com")
    ));

    public OrderController(UserClient userClient) {
        this.userClient = userClient;
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return orders;
    }

    @GetMapping("/{id}")
    public Map<String, Object> getOrder(@PathVariable Long id) {
        Order order = orders.stream().filter(o -> o.getId().equals(id)).findFirst().orElse(null);
        if (order == null) return null;

        Map<String, Object> result = new HashMap<>();
        result.put("order", order);
        result.put("user", userClient.getUser(1L));
        return result;
    }

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        order.setId((long) (orders.size() + 1));
        orders.add(order);
        return order;
    }
}
