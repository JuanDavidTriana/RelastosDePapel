package com.relatosdepapel.payments.service;

import com.relatosdepapel.payments.client.BookDTO;
import com.relatosdepapel.payments.client.BookServiceClient;
import com.relatosdepapel.payments.model.MultiplePurchaseRequest;
import com.relatosdepapel.payments.model.MultiplePurchaseResponse;
import com.relatosdepapel.payments.model.Purchase;
import com.relatosdepapel.payments.model.PurchaseStatus;
import com.relatosdepapel.payments.repository.PurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PurchaseService {

    @Autowired
    private PurchaseRepository purchaseRepository;

    @Autowired
    private BookServiceClient bookServiceClient;

    @Transactional
    public Purchase processPurchase(Purchase purchase) {
        // Set purchase date and status
        purchase.setPurchaseDate(LocalDateTime.now());
        purchase.setStatus(PurchaseStatus.CONFIRMED);

        // Save purchase
        return purchaseRepository.save(purchase);
    }

    @Transactional
    public MultiplePurchaseResponse processMultiplePurchases(MultiplePurchaseRequest request) {
        List<Purchase> purchases = new ArrayList<>();
        double totalAmount = 0.0;
        
        for (MultiplePurchaseRequest.PurchaseItem item : request.getItems()) {
            // Create purchase for each item
            Purchase purchase = new Purchase();
            purchase.setBookId(item.getBookId());
            purchase.setQuantity(item.getQuantity());
            purchase.setCustomerEmail(request.getCustomerEmail());
            purchase.setPurchaseDate(LocalDateTime.now());
            purchase.setStatus(PurchaseStatus.CONFIRMED);
            
            // Calculate total amount for this item (you might want to get price from book service)
            // For now, we'll use a default calculation
            double itemTotal = item.getQuantity() * 10.0; // Default price, should get from book service
            purchase.setTotalAmount(itemTotal);
            totalAmount += itemTotal;
            
            // Save purchase
            Purchase savedPurchase = purchaseRepository.save(purchase);
            purchases.add(savedPurchase);
        }
        
        return new MultiplePurchaseResponse(purchases, totalAmount, request.getCustomerEmail(), "CONFIRMED");
    }

    public List<Purchase> getAllPurchases() {
        return purchaseRepository.findAll();
    }

    public Optional<Purchase> getPurchaseById(Long id) {
        return purchaseRepository.findById(id);
    }
} 