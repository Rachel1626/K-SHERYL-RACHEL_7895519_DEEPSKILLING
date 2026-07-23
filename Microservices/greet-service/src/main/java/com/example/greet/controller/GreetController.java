package com.example.greet.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class GreetController {

    @GetMapping("/greet")
    public Map<String, String> greet() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Hello World!!");
        return response;
    }
}
