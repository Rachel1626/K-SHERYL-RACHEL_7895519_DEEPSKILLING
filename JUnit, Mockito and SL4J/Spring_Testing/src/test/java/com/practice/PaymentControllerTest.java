package com.practice;

import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class PaymentControllerTest {

    MockMvc mockMvc = MockMvcBuilders
            .standaloneSetup(new PaymentController())
            .setControllerAdvice(new GlobalExceptionHandler())
            .build();

    @Test
    void testInvalidPayment() throws Exception {

        mockMvc.perform(post("/payment")
                        .param("amount", "-100"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Invalid Amount"));
    }
}