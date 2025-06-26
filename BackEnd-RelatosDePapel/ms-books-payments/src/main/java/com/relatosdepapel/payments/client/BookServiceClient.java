package com.relatosdepapel.payments.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "ms-books-catalogue")
public interface BookServiceClient {
    
    @GetMapping("/books/{id}")
    ResponseEntity<BookDTO> getBookById(@PathVariable Long id);
} 