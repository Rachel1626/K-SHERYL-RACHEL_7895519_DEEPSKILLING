package com.example.loan.model;

public class Loan {
    private Long id;
    private String loanNumber;
    private String loanType;
    private double amount;

    public Loan() {}

    public Loan(Long id, String loanNumber, String loanType, double amount) {
        this.id = id;
        this.loanNumber = loanNumber;
        this.loanType = loanType;
        this.amount = amount;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getLoanNumber() { return loanNumber; }
    public void setLoanNumber(String loanNumber) { this.loanNumber = loanNumber; }
    public String getLoanType() { return loanType; }
    public void setLoanType(String loanType) { this.loanType = loanType; }
    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
}
