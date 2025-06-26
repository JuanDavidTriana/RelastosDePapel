package com.relatosdepapel.payments.controller;

import com.relatosdepapel.payments.model.MultiplePurchaseRequest;
import com.relatosdepapel.payments.model.MultiplePurchaseResponse;
import com.relatosdepapel.payments.model.Purchase;
import com.relatosdepapel.payments.service.PurchaseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/purchases")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"})
public class PurchaseController {

    @Autowired
    private PurchaseService purchaseService;

    @PostMapping
    public ResponseEntity<Purchase> createPurchase(@Valid @RequestBody Purchase purchase) {
        return ResponseEntity.ok(purchaseService.processPurchase(purchase));
    }

    @PostMapping("/multiple")
    public ResponseEntity<MultiplePurchaseResponse> createMultiplePurchases(@Valid @RequestBody MultiplePurchaseRequest request) {
        return ResponseEntity.ok(purchaseService.processMultiplePurchases(request));
    }

    @GetMapping
    public ResponseEntity<List<Purchase>> getAllPurchases() {
        return ResponseEntity.ok(purchaseService.getAllPurchases());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Purchase> getPurchaseById(@PathVariable Long id) {
        return purchaseService.getPurchaseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
} 