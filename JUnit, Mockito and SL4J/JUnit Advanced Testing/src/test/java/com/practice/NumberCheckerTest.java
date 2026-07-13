package com.practice;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class NumberCheckerTest {

    NumberChecker checker = new NumberChecker();

    @Test
    void testPositiveNumber() {
        assertTrue(checker.isPositive(10));
    }
}