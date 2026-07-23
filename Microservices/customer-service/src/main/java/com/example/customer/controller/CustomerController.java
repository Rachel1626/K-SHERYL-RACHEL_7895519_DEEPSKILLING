package com.example.customer.controller;

import com.example.customer.model.Customer;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/customers")
public class CustomerController {
    private final List<Customer> customers = new ArrayList<>(List.of(
        new Customer(1L, "John Doe", "john@example.com", "123-456-7890"),
        new Customer(2L, "Jane Smith", "jane@example.com", "098-765-4321")
    ));

    @GetMapping
    public List<Customer> getAll() { return customers; }

    @GetMapping("/{id}")
    public Customer getById(@PathVariable Long id) {
        return customers.stream().filter(c -> c.getId().equals(id)).findFirst().orElse(null);
    }

    @PostMapping
    public Customer create(@RequestBody Customer customer) {
        customer.setId((long)(customers.size() + 1));
        customers.add(customer);
        return customer;
    }
}
