package com.practice;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class NumberServiceTest {

    NumberService service = new NumberService();

    @ParameterizedTest
    @ValueSource(ints = {1, 10, 100, 999})
    void testPositiveNumbers(int number) {

        assertTrue(service.isPositive(number));

    }
}