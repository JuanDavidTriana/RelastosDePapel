package com.relatosdepapel.gateway.filter;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpMethod;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.util.Map;

@Component
public class RequestTranscriptionFilter extends AbstractGatewayFilterFactory<RequestTranscriptionFilter.Config> {

    public RequestTranscriptionFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();
            
            // Only process POST requests to /api/generic
            if (request.getMethod() == HttpMethod.POST && request.getURI().getPath().startsWith("/api/generic")) {
                // Read the request body to get the target method and path
                return exchange.getRequest().getBody()
                    .next()
                    .flatMap(dataBuffer -> {
                        String body = dataBuffer.toString();
                        Map<String, String> requestInfo = parseRequestBody(body);
                        
                        // Create a new request with the target method and path
                        ServerHttpRequest newRequest = request.mutate()
                            .method(HttpMethod.valueOf(requestInfo.get("method")))
                            .path(requestInfo.get("path"))
                            .build();
                        
                        return chain.filter(exchange.mutate().request(newRequest).build());
                    });
            }
            
            return chain.filter(exchange);
        };
    }

    private Map<String, String> parseRequestBody(String body) {
        // This is a simplified example. In a real application, you would want to properly parse JSON
        // and handle errors appropriately
        try {
            // Assuming body is JSON like: {"method": "GET", "path": "/api/books/1"}
            return Map.of(
                "method", body.split("\"method\":\\s*\"")[1].split("\"")[0],
                "path", body.split("\"path\":\\s*\"")[1].split("\"")[0]
            );
        } catch (Exception e) {
            throw new RuntimeException("Invalid request body format", e);
        }
    }

    public static class Config {
        // Configuration properties if needed
    }
} 