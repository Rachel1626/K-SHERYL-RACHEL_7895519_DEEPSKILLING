package com.example.resource.controller;

import com.example.resource.model.UserResource;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class ResourceController {

    @GetMapping("/public/info")
    public Map<String, String> publicInfo() {
        return Map.of("message", "This is a public endpoint - no auth required");
    }

    @GetMapping("/user/profile")
    public Map<String, Object> userProfile(@AuthenticationPrincipal Jwt jwt) {
        Map<String, Object> profile = new java.util.HashMap<>();
        profile.put("subject", jwt.getSubject());
        profile.put("issuer", jwt.getIssuer().toString());
        profile.put("scopes", jwt.getClaimAsStringList("scope"));
        profile.put("claims", jwt.getClaims());
        return profile;
    }

    @GetMapping("/user/data")
    public UserResource userData(@AuthenticationPrincipal Jwt jwt) {
        return new UserResource(
                jwt.getSubject(),
                jwt.getClaimAsString("email"),
                "USER"
        );
    }

    @GetMapping("/admin/dashboard")
    public Map<String, String> adminDashboard(@AuthenticationPrincipal Jwt jwt) {
        return Map.of(
                "message", "Welcome to admin dashboard",
                "admin", jwt.getSubject()
        );
    }
}
