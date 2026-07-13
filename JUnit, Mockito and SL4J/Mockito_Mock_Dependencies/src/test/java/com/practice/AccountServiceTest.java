package com.practice;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

public class AccountServiceTest {

    @Test
    void testRepositoryThrowsException() {

        AccountRepository repository = mock(AccountRepository.class);

        doThrow(new RuntimeException("Database Error"))
                .when(repository)
                .save("Rachel");

        AccountService service = new AccountService(repository);

        RuntimeException exception =
                assertThrows(RuntimeException.class,
                        () -> service.createAccount("Rachel"));

        org.junit.jupiter.api.Assertions.assertEquals(
                "Database Error",
                exception.getMessage()
        );
    }
}