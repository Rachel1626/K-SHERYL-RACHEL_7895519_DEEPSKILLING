package com.practice;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class NetworkServiceTest {

    @Test
    void testServiceWithMockNetworkClient() {

        // Arrange
        NetworkClient mockNetworkClient = mock(NetworkClient.class);

        when(mockNetworkClient.connect())
                .thenReturn("Mock Connection");

        NetworkService networkService =
                new NetworkService(mockNetworkClient);

        // Act
        String result = networkService.connectToServer();

        // Assert
        assertEquals("Connected to Mock Connection", result);

        verify(mockNetworkClient).connect();
    }
}