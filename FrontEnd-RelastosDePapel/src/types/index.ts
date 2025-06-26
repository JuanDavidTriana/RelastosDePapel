export interface Book {
  id: number;
  title: string;
  author: string;
  publicationDate: string;
  category: string;
  isbn: string;
  rating?: number;
  visibility?: boolean;
  price: number;
  stock?: number;
  description?: string;
  coverImage?: string;
}

export interface Author {
  id: number;
  name: string;
  biography: string;
  imageUrl?: string;
  books?: Book[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface Order {
  id: number;
  userId: number;
  books: {
    bookId: number;
    quantity: number;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
}

export interface Purchase {
  id?: number;
  bookId: number;
  purchaseDate?: string;
  quantity: number;
  totalAmount?: number;
  customerEmail: string;
  status?: 'PENDING' | 'CONFIRMED' | 'FAILED';
}

export interface PurchaseRequest {
  bookId: number;
  quantity: number;
  customerEmail: string;
  totalAmount?: number;
}

export interface MultiplePurchaseRequest {
  items: {
    bookId: number;
    quantity: number;
  }[];
  customerEmail: string;
}

export interface MultiplePurchaseResponse {
  purchases: Purchase[];
  totalAmount: number;
  customerEmail: string;
  status: string;
} 