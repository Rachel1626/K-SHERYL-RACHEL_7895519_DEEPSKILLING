package com.practice;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class EmployeeServiceTest {

    @Test
    void testFindByEmail() {

        EmployeeRepository repository = mock(EmployeeRepository.class);

        Employee employee = new Employee("rachel@gmail.com");

        when(repository.findByEmail("rachel@gmail.com"))
                .thenReturn(employee);

        EmployeeService service = new EmployeeService(repository);

        Employee result =
                service.getEmployee("rachel@gmail.com");

        assertEquals("rachel@gmail.com",
                result.getEmail());

        verify(repository).findByEmail("rachel@gmail.com");
    }

}