package com.practice;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class ApiServiceTest {

    @Test
    void testServiceWithMockRestClient() {

        // Arrange
        RestClient mockRestClient = mock(RestClient.class);

        when(mockRestClient.getResponse())
                .thenReturn("Mock Response");

        ApiService apiService = new ApiService(mockRestClient);

        // Act
        String result = apiService.fetchData();

        // Assert
        assertEquals("Fetched Mock Response", result);

        verify(mockRestClient).getResponse();
    }
}