package com.example.billing.controller;

import com.example.billing.model.Billing;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/billings")
public class BillingController {
    private final List<Billing> billings = new ArrayList<>(List.of(
        new Billing(1L, 1L, 150.00, "PAID"),
        new Billing(2L, 2L, 250.00, "PENDING")
    ));

    @GetMapping
    public List<Billing> getAll() { return billings; }

    @GetMapping("/{id}")
    public Billing getById(@PathVariable Long id) {
        return billings.stream().filter(b -> b.getId().equals(id)).findFirst().orElse(null);
    }

    @GetMapping("/customer/{customerId}")
    public List<Billing> getByCustomer(@PathVariable Long customerId) {
        return billings.stream().filter(b -> b.getCustomerId().equals(customerId)).toList();
    }

    @PostMapping
    public Billing create(@RequestBody Billing billing) {
        billing.setId((long)(billings.size() + 1));
        billings.add(billing);
        return billing;
    }
}
