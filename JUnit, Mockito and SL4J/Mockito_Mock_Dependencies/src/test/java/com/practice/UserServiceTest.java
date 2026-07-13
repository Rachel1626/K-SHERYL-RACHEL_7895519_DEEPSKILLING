package com.practice;

import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class UserServiceTest {

    @Test
    void testGetUserById() {

        UserRepository repository = mock(UserRepository.class);

        User user = new User(1L, "Rachel");

        when(repository.findById(1L))
                .thenReturn(Optional.of(user));

        UserService service = new UserService(repository);

        User result = service.getUserById(1L);

        assertEquals("Rachel", result.getName());

        verify(repository).findById(1L);
    }
}