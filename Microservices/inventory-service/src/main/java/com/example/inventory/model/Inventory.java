package com.example.inventory.model;

public class Inventory {
    private Long id;
    private String productCode;
    private int quantity;
    private String warehouse;

    public Inventory() {}

    public Inventory(Long id, String productCode, int quantity, String warehouse) {
        this.id = id;
        this.productCode = productCode;
        this.quantity = quantity;
        this.warehouse = warehouse;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getProductCode() { return productCode; }
    public void setProductCode(String productCode) { this.productCode = productCode; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public String getWarehouse() { return warehouse; }
    public void setWarehouse(String warehouse) { this.warehouse = warehouse; }
}
