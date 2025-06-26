import React, { useState, useMemo } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Container,
  TextField,
  MenuItem,
  Paper,
  InputAdornment,
  Chip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useCart } from '../hooks/useCart';
import { Book } from '../types';

interface BookCatalogProps {
  books: Book[];
}

const BookCatalog: React.FC<BookCatalogProps> = ({ books }) => {
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('title');

  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesPrice = priceFilter === 'all' ? true :
          priceFilter === 'under20' ? book.price < 20 :
          priceFilter === '20to30' ? book.price >= 20 && book.price <= 30 :
          book.price > 30;

        return matchesSearch && matchesPrice;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'title':
            return a.title.localeCompare(b.title);
          case 'author':
            return a.author.localeCompare(b.author);
          default:
            return 0;
        }
      });
  }, [books, searchTerm, priceFilter, sortBy]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          mb: 4, 
          bgcolor: 'background.paper',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Buscar por título o autor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              select
              variant="outlined"
              label="Filtrar por precio"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <MenuItem value="all">Todos los precios</MenuItem>
              <MenuItem value="under20">Menos de $20</MenuItem>
              <MenuItem value="20to30">$20 - $30</MenuItem>
              <MenuItem value="over30">Más de $30</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              select
              variant="outlined"
              label="Ordenar por"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="title">Título</MenuItem>
              <MenuItem value="author">Autor</MenuItem>
              <MenuItem value="price-asc">Precio: Menor a Mayor</MenuItem>
              <MenuItem value="price-desc">Precio: Mayor a Menor</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={4}>
        {filteredBooks.map((book) => (
          <Grid item key={book.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                },
              }}
            >
              <CardMedia
                component="img"
                image={book.coverImage || 'https://via.placeholder.com/200x300?text=No+Image'}
                alt={book.title}
                sx={{
                  width: '100%',
                  aspectRatio: '2/3',
                  objectFit: 'contain',
                  bgcolor: '#f5f5f5',
                  borderTopLeftRadius: 2,
                  borderTopRightRadius: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  p: 1
                }}
              />
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {book.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  {book.author}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Año: {formatDate(book.publicationDate)}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Categoría: {book.category}
                </Typography>
                {book.rating && (
                  <Box sx={{ mb: 1 }}>
                    <Chip 
                      label={`⭐ ${book.rating}/5`} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                    />
                  </Box>
                )}
                {book.description && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {book.description}
                  </Typography>
                )}
                <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" color="primary">
                    ${book.price.toFixed(2)}
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => addToCart(book)}
                    sx={{ ml: 2 }}
                    disabled={book.stock === 0}
                  >
                    {book.stock === 0 ? 'Sin stock' : 'Añadir al carrito'}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BookCatalog; 