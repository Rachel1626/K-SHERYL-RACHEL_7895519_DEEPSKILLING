package com.practice;

import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class UserControllerTest {

    @Test
    void testCreateUser() throws Exception {

        MockMvc mockMvc =
                MockMvcBuilders.standaloneSetup(new UserController()).build();

        mockMvc.perform(post("/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("\"Rachel\""))
                .andExpect(status().isOk())
                .andExpect(content().string("User Rachel created"));
    }
}