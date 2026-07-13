package com.practice;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    private final PaymentService service = new PaymentService();

    @PostMapping
    public String pay(@RequestParam("amount") double amount) {

        service.processPayment(amount);
        return "Payment Successful";
    }
}