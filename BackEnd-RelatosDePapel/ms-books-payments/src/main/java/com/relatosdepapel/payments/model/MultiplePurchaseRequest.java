package com.relatosdepapel.payments.model;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public class MultiplePurchaseRequest {
    
    @NotEmpty(message = "La lista de compras no puede estar vacía")
    @Valid
    private List<PurchaseItem> items;
    
    @Email(message = "El email del cliente debe ser válido")
    private String customerEmail;
    
    // Constructors
    public MultiplePurchaseRequest() {}
    
    public MultiplePurchaseRequest(List<PurchaseItem> items, String customerEmail) {
        this.items = items;
        this.customerEmail = customerEmail;
    }
    
    // Getters and Setters
    public List<PurchaseItem> getItems() {
        return items;
    }
    
    public void setItems(List<PurchaseItem> items) {
        this.items = items;
    }
    
    public String getCustomerEmail() {
        return customerEmail;
    }
    
    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }
    
    // Inner class for individual purchase items
    public static class PurchaseItem {
        private Long bookId;
        private Integer quantity;
        
        // Constructors
        public PurchaseItem() {}
        
        public PurchaseItem(Long bookId, Integer quantity) {
            this.bookId = bookId;
            this.quantity = quantity;
        }
        
        // Getters and Setters
        public Long getBookId() {
            return bookId;
        }
        
        public void setBookId(Long bookId) {
            this.bookId = bookId;
        }
        
        public Integer getQuantity() {
            return quantity;
        }
        
        public void setQuantity(Integer quantity) {
            this.quantity = quantity;
        }
    }
} 