import { useState, useContext, createContext, ReactNode, useEffect } from 'react';

interface OrderItem {
  id: string;
  title: string;
  author: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: 'completada' | 'en proceso' | 'entregada';
  paymentMethod: string;
}

interface OrderHistoryContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'date'>) => void;
  getOrder: (orderId: string) => Order | undefined;
}

const OrderHistoryContext = createContext<OrderHistoryContextType | undefined>(undefined);

export const OrderHistoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const stored = localStorage.getItem('orderHistory');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('orderHistory', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (orderData: Omit<Order, 'id' | 'date'>) => {
    const newOrder: Order = {
      ...orderData,
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: new Date().toISOString(),
    };
    setOrders((prevOrders) => [newOrder, ...prevOrders]);
  };

  const getOrder = (orderId: string) => {
    return orders.find((order) => order.id === orderId);
  };

  return (
    <OrderHistoryContext.Provider value={{ orders, addOrder, getOrder }}>
      {children}
    </OrderHistoryContext.Provider>
  );
};

export const useOrderHistory = () => {
  const context = useContext(OrderHistoryContext);
  if (context === undefined) {
    throw new Error('useOrderHistory must be used within an OrderHistoryProvider');
  }
  return context;
}; 