package com.example.payment.service;

import com.example.payment.model.Payment;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    private static final Logger logger = LoggerFactory.getLogger(PaymentService.class);

    @CircuitBreaker(name = "paymentService", fallbackMethod = "paymentFallback")
    public Payment processPayment(Payment payment) {
        if (payment.getAmount() > 10000) {
            throw new RuntimeException("Payment amount exceeds limit");
        }
        payment.setStatus("SUCCESS");
        return payment;
    }

    public Payment paymentFallback(Payment payment, Throwable throwable) {
        logger.warn("Circuit breaker fallback triggered for order {}: {}",
                payment.getOrderId(), throwable.getMessage());
        payment.setStatus("FAILED - FALLBACK");
        return payment;
    }
}
