package com.example.lbgateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class LoadBalancerGatewayApplication {
    public static void main(String[] args) {
        SpringApplication.run(LoadBalancerGatewayApplication.class, args);
    }
}
