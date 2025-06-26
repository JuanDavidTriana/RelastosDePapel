import { useState, useEffect } from 'react';
import { bookService } from '../services/api';
import { Book } from '../types';

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await bookService.getAll();
      
      // Manejar respuesta paginada del backend
      const responseData = response.data as any;
      if (responseData.content) {
        // Si es una respuesta paginada
        setBooks(responseData.content);
      } else {
        // Si es una respuesta simple
        setBooks(responseData);
      }
      
      setError(null);
    } catch (err) {
      setError('Error al cargar los libros');
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  const addBook = async (book: Omit<Book, 'id'>) => {
    try {
      const response = await bookService.create(book);
      setBooks((prev) => [...prev, response.data]);
      return true;
    } catch (err) {
      console.error('Error adding book:', err);
      return false;
    }
  };

  const updateBook = async (id: number, book: Partial<Book>) => {
    try {
      const response = await bookService.update(id, book);
      setBooks((prev) => prev.map((b) => (b.id === id ? response.data : b)));
      return true;
    } catch (err) {
      console.error('Error updating book:', err);
      return false;
    }
  };

  const deleteBook = async (id: number) => {
    try {
      await bookService.delete(id);
      setBooks((prev) => prev.filter((book) => book.id !== id));
      return true;
    } catch (err) {
      console.error('Error deleting book:', err);
      return false;
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return {
    books,
    loading,
    error,
    addBook,
    updateBook,
    deleteBook,
    refreshBooks: fetchBooks,
  };
}; 