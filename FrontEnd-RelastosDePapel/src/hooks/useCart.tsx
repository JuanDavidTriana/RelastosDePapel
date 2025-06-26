import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Book } from '../types';
import { purchaseService } from '../services/api';

export interface CartItem extends Book {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: number) => void;
  updateQuantity: (bookId: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  processPurchase: (customerEmail: string) => Promise<{ success: boolean; result?: any; error?: string }>;
  purchaseLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem('cartItems');
    return stored ? JSON.parse(stored) : [];
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [purchaseLoading, setPurchaseLoading] = useState(false);

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }, [items]);

  const addToCart = (book: Book) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === book.id);
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentItems, { ...book, quantity: 1 }];
    });
  };

  const removeFromCart = (bookId: number) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== bookId)
    );
  };

  const updateQuantity = (bookId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(bookId);
      return;
    }
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === bookId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCart = () => {
    setCartOpen(true);
  };

  const closeCart = () => {
    setCartOpen(false);
  };

  const processPurchase = async (customerEmail: string): Promise<{ success: boolean; result?: any; error?: string }> => {
    if (items.length === 0) return { success: false };

    try {
      setPurchaseLoading(true);
      console.log('Iniciando proceso de compra múltiple para:', customerEmail);
      console.log('Items en carrito:', items);
      
      // Crear una sola petición con todos los items del carrito
      const multiplePurchaseRequest = {
        items: items.map(item => ({
          bookId: item.id,
          quantity: item.quantity
        })),
        customerEmail: customerEmail
      };
      
      console.log('Enviando compra múltiple:', multiplePurchaseRequest);
      
      const result = await purchaseService.createMultiple(multiplePurchaseRequest);
      console.log('Compra múltiple procesada exitosamente:', result);
      clearCart();
      return { success: true, result };
    } catch (error) {
      console.error('Error during purchase:', error);
      return { success: false, error: error instanceof Error ? error.message : 'An error occurred' };
    } finally {
      setPurchaseLoading(false);
    }
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
    cartOpen,
    openCart,
    closeCart,
    processPurchase,
    purchaseLoading,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 