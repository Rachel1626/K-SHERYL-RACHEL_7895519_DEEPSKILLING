package com.practice;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @PostMapping
    public String createUser(@RequestBody String name) {
        name = name.replace("\"", "");
        return "User " + name + " created";
    }
}