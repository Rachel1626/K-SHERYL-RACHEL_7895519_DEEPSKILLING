package com.practice;

import org.junit.jupiter.api.*;

import static org.junit.jupiter.api.Assertions.*;

public class CalculatorTest {

    Calculator calculator;

    @BeforeEach
    void setUp() {
        calculator = new Calculator();
        System.out.println("Calculator Created");
    }

    @AfterEach
    void tearDown() {
        System.out.println("Test Completed");
    }

    @Test
    void testAdd() {

        // Arrange
        int a = 5;
        int b = 3;

        // Act
        int result = calculator.add(a, b);

        // Assert
        assertEquals(8, result);
    }

    @Test
    void testSubtract() {

        int result = calculator.subtract(5, 3);

        assertEquals(2, result);
    }

    @Test
    void testMultiply() {

        int result = calculator.multiply(5, 3);

        assertEquals(15, result);
    }

    @Test
    void testDivide() {

        int result = calculator.divide(6, 3);

        assertEquals(2, result);
    }
}