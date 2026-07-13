package com.practice;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class MyServiceTest {
    @Test
    void testVerifyTimes() {

        ExternalApi mockApi = mock(ExternalApi.class);

        when(mockApi.getData()).thenReturn("Mock Data");

        MyService service = new MyService(mockApi);

        service.fetchData();
        service.fetchData();

        verify(mockApi, times(2)).getData();
    }
    @Test
    void testMultipleReturns() {

        ExternalApi mockApi = mock(ExternalApi.class);

        when(mockApi.getData())
                .thenReturn("Processing")
                .thenReturn("Shipped")
                .thenReturn("Delivered");

        assertEquals("Processing", mockApi.getData());
        assertEquals("Shipped", mockApi.getData());
        assertEquals("Delivered", mockApi.getData());
    }
    @Test
    void testDoThrow() {

        ExternalApi mockApi = mock(ExternalApi.class);

        doThrow(new RuntimeException("Delete Failed"))
                .when(mockApi)
                .deleteUser("Rachel");

        MyService service = new MyService(mockApi);

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> service.removeUser("Rachel")
        );

        assertEquals("Delete Failed", exception.getMessage());
    }
    @Test
    void testDoNothing() {

        ExternalApi mockApi = mock(ExternalApi.class);

        doNothing().when(mockApi).deleteUser("Rachel");

        MyService service = new MyService(mockApi);

        service.removeUser("Rachel");

        verify(mockApi).deleteUser("Rachel");
    }
    @Test
    void testEqMatcher() {

        ExternalApi mockApi = mock(ExternalApi.class);

        when(mockApi.getUser(eq("Rachel")))
                .thenReturn("Admin");

        MyService service = new MyService(mockApi);

        assertEquals("Admin",
                service.fetchUser("Rachel"));
    }
    @Test
    void testAnyMatcher() {

        ExternalApi mockApi = mock(ExternalApi.class);

        when(mockApi.getUser(anyString()))
                .thenReturn("User Found");

        MyService service = new MyService(mockApi);

        assertEquals("User Found",
                service.fetchUser("Rachel"));

        assertEquals("User Found",
                service.fetchUser("John"));
    }
    @Test
    void testVerifyMethodCall() {

        // Arrange
        ExternalApi mockApi = mock(ExternalApi.class);

        when(mockApi.getData()).thenReturn("Mock Data");

        MyService service = new MyService(mockApi);

        // Act
        service.fetchData();

        // Assert
        verify(mockApi).getData();
    }
    @Test
    void testExternalApi() {

        // Arrange

        ExternalApi mockApi = mock(ExternalApi.class);

        when(mockApi.getData()).thenReturn("Mock Data");

        MyService service = new MyService(mockApi);

        // Act

        String result = service.fetchData();

        // Assert

        assertEquals("Mock Data", result);

    }
}