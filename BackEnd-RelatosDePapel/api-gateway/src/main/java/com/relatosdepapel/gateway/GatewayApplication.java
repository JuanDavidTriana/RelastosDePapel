package com.relatosdepapel.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableDiscoveryClient
public class GatewayApplication {
    public static void main(String[] args) {
        SpringApplication.run(GatewayApplication.class, args);
    }

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("books-service", r -> r
                        .path("/api/books/**")
                        .filters(f -> f.stripPrefix(1))
                        .uri("lb://ms-books-catalogue"))
                .route("payments-service", r -> r
                        .path("/api/payments/**")
                        .filters(f -> f.stripPrefix(1))
                        .uri("lb://ms-books-payments"))
                .build();
    }
} 