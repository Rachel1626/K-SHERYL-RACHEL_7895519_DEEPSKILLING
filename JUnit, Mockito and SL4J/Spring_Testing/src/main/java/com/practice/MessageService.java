package com.practice;

import org.springframework.stereotype.Service;

@Service
public class MessageService {

    public String getMessage() {
        return "Integration Test Passed";
    }

}