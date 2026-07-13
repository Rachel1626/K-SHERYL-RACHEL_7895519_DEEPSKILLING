package com.practice;

import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class UserServiceTest {

    @Test
    void testGetUserById() {

        // Arrange
        UserRepository mockRepository = mock(UserRepository.class);

        User user = new User(1L, "Rachel");

        when(mockRepository.findById(1L))
                .thenReturn(Optional.of(user));

        UserService service = new UserService(mockRepository);

        // Act
        User result = service.getUserById(1L);

        // Assert
        assertEquals("Rachel", result.getName());

        verify(mockRepository).findById(1L);
    }
}