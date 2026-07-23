package com.example.inventory.controller;

import com.example.inventory.model.Inventory;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/inventory")
public class InventoryController {

    private final List<Inventory> inventoryList = new ArrayList<>(List.of(
            new Inventory(1L, "PROD-001", 150, "Warehouse-A"),
            new Inventory(2L, "PROD-002", 80, "Warehouse-B")
    ));

    @GetMapping
    public List<Inventory> getAllInventory() {
        return inventoryList;
    }

    @GetMapping("/{productCode}")
    public Inventory getInventory(@PathVariable String productCode) {
        return inventoryList.stream()
                .filter(i -> i.getProductCode().equals(productCode))
                .findFirst().orElse(null);
    }

    @PostMapping
    public Inventory createInventory(@RequestBody Inventory inventory) {
        inventory.setId((long) (inventoryList.size() + 1));
        inventoryList.add(inventory);
        return inventory;
    }
}
