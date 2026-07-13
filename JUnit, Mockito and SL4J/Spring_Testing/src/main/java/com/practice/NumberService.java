package com.practice;

import org.springframework.stereotype.Service;

@Service
public class NumberService {

    public boolean isPositive(int number) {
        return number > 0;
    }
}