package com.practice;

import org.springframework.stereotype.Service;
@Service
public class PaymentService {

    public void processPayment(double amount) {

        if (amount <= 0) {
            throw new IllegalArgumentException("Invalid Amount");
        }
    }
}