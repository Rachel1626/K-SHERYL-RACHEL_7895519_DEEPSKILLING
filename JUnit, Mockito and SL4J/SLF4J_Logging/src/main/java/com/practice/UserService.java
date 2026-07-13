package com.practice;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class UserService {

    private static final Logger logger =
            LoggerFactory.getLogger(UserService.class);

    public void createUser(String name) {

        try {

            logger.info("Creating user: {}", name);

            int x = 10 / 0;   // Force an exception

            logger.info("User created successfully");

        } catch (Exception e) {

            logger.error("Error while creating user", e);

        }
    }
}