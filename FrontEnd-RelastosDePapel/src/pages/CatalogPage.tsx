import React from 'react';
import { Box, Container, Typography, CircularProgress, Alert } from '@mui/material';
import BookCatalog from '../components/BookCatalog';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useBooks } from '../hooks/useBooks';

const CatalogPage: React.FC = () => {
  const { books, loading, error } = useBooks();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ flex: 1, bgcolor: 'background.default' }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            align="center" 
            sx={{ 
              mb: 4,
              color: 'primary.main',
              fontWeight: 700,
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
              '&:after': {
                content: '""',
                display: 'block',
                width: '100px',
                height: '4px',
                backgroundColor: 'primary.main',
                margin: '20px auto',
                borderRadius: '2px',
              }
            }}
          >
            Catálogo de Libros
          </Typography>

          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress size={60} />
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 4 }}>
              {error}
            </Alert>
          )}

          {!loading && !error && books.length === 0 && (
            <Alert severity="info" sx={{ mb: 4 }}>
              No hay libros disponibles en el catálogo.
            </Alert>
          )}

          {!loading && !error && books.length > 0 && (
            <BookCatalog books={books} />
          )}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default CatalogPage; 