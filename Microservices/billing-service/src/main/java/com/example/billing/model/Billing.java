package com.example.billing.model;

public class Billing {
    private Long id;
    private Long customerId;
    private double amount;
    private String status;

    public Billing() {}
    public Billing(Long id, Long customerId, double amount, String status) {
        this.id = id; this.customerId = customerId; this.amount = amount; this.status = status;
    }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getCustomerId() { return customerId; }
    public void setCustomerId(Long customerId) { this.customerId = customerId; }
    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
