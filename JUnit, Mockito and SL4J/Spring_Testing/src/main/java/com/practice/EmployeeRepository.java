package com.practice;

public interface EmployeeRepository {

    Employee findByEmail(String email);

}