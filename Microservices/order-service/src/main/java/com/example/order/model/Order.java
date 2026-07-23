package com.example.order.model;

public class Order {
    private Long id;
    private String productName;
    private int quantity;
    private double price;
    private String userEmail;

    public Order() {}

    public Order(Long id, String productName, int quantity, double price, String userEmail) {
        this.id = id;
        this.productName = productName;
        this.quantity = quantity;
        this.price = price;
        this.userEmail = userEmail;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
}
