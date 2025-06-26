import { useState } from 'react';
import { purchaseService } from '../services/api';
import { Purchase, PurchaseRequest } from '../types';

export const usePurchases = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPurchase = async (purchase: PurchaseRequest): Promise<Purchase> => {
    try {
      setLoading(true);
      setError(null);
      const response = await purchaseService.create(purchase);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al procesar la compra';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    loading,
    error,
    createPurchase,
    clearError,
  };
}; 