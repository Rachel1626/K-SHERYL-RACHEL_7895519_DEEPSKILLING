package com.practice;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringJUnitConfig
@ContextConfiguration(classes = AppConfig.class)
public class MessageServiceTest {

    @Autowired
    MessageService service;

    @Test
    void testMessage() {

        assertEquals("Integration Test Passed",
                service.getMessage());

    }

}