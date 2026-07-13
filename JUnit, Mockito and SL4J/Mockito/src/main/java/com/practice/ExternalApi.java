package com.practice;

public interface ExternalApi {

    String getData();
    String getUser(String name);

    void deleteUser(String name);
}