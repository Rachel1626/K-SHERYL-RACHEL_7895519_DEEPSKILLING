package com.example.resource.model;

public class UserResource {
    private String username;
    private String email;
    private String role;

    public UserResource() {}
    public UserResource(String username, String email, String role) {
        this.username = username;
        this.email = email;
        this.role = role;
    }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
