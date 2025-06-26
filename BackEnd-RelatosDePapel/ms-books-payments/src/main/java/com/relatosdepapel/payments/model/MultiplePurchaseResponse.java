package com.relatosdepapel.payments.model;

import java.util.List;

public class MultiplePurchaseResponse {
    
    private List<Purchase> purchases;
    private double totalAmount;
    private String customerEmail;
    private String status;
    
    // Constructors
    public MultiplePurchaseResponse() {}
    
    public MultiplePurchaseResponse(List<Purchase> purchases, double totalAmount, String customerEmail, String status) {
        this.purchases = purchases;
        this.totalAmount = totalAmount;
        this.customerEmail = customerEmail;
        this.status = status;
    }
    
    // Getters and Setters
    public List<Purchase> getPurchases() {
        return purchases;
    }
    
    public void setPurchases(List<Purchase> purchases) {
        this.purchases = purchases;
    }
    
    public double getTotalAmount() {
        return totalAmount;
    }
    
    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }
    
    public String getCustomerEmail() {
        return customerEmail;
    }
    
    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
} 