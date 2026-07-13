package com.practice;

import org.springframework.stereotype.Repository;

@Repository
public class BookRepository {

    public void display() {
        System.out.println("Book Repository Called");
    }
}