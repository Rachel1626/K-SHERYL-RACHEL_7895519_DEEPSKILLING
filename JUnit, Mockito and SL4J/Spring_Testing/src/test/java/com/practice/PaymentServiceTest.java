package com.practice;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class PaymentServiceTest {

    PaymentService service = new PaymentService();

    @Test
    void testInvalidPayment() {

        IllegalArgumentException exception =
                assertThrows(IllegalArgumentException.class,
                        () -> service.processPayment(-100));

        assertEquals("Invalid Amount", exception.getMessage());

    }

}