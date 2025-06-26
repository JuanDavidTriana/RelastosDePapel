import { Card, CardContent, CardMedia, Typography, Box, Button, Chip } from '@mui/material';
import { Book } from '../../types';

interface BookCardProps {
  book: Book;
  onAddToCart?: (book: Book) => void;
  hideDescriptionAndPrice?: boolean;
}

const BookCard = ({ book, onAddToCart, hideDescriptionAndPrice = false }: BookCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  return (
    <Card
      sx={{
        width: 260,
        maxWidth: '100%',
        height: 440,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        transition: 'box-shadow 0.3s, transform 0.2s',
        borderRadius: 6,
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        m: 'auto',
        bgcolor: '#fffdfa',
        border: '1.5px solid #f3e9e1',
        '&:hover': {
          transform: 'translateY(-6px) scale(1.04)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.16)',
          borderColor: 'primary.main',
        },
      }}
    >
      <CardMedia
        component="img"
        image={book.coverImage || 'https://via.placeholder.com/200x300?text=No+Image'}
        alt={book.title}
        sx={{
          width: '100%',
          height: 240,
          aspectRatio: '2/3',
          objectFit: 'contain',
          bgcolor: '#f5f5f5',
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          p: 1,
        }}
      />
      <CardContent sx={{ flexGrow: 1, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', px: 2, pb: 4, gap: 0.5 }}>
        <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 600, fontSize: '1.18rem', mb: 0.5, fontFamily: 'Montserrat, sans-serif' }}>
          {book.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ fontSize: '1rem', mb: 0.5, fontFamily: 'Montserrat, sans-serif' }}>
          {book.author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Año: {formatDate(book.publicationDate)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Categoría: {book.category}
        </Typography>
        {book.rating && (
          <Box>
            <Chip 
              label={`⭐ ${book.rating}/5`} 
              size="small" 
              color="primary" 
              variant="outlined"
              sx={{ fontWeight: 500, fontSize: '0.95rem', bgcolor: '#fff8e1' }}
            />
          </Box>
        )}
        {!hideDescriptionAndPrice && book.description && (
          <Typography variant="body2" color="text.secondary" sx={{ minHeight: 40, maxHeight: 40, overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {book.description}
          </Typography>
        )}
        <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {!hideDescriptionAndPrice && (
            <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
              ${book.price.toFixed(2)}
            </Typography>
          )}
          {onAddToCart && (
            <Button
              variant="contained"
              onClick={() => onAddToCart(book)}
              sx={{ ml: 2, minWidth: 120, borderRadius: 3, fontWeight: 600, bgcolor: 'primary.main', color: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', '&:hover': { bgcolor: 'primary.dark' } }}
              disabled={book.stock === 0}
            >
              {book.stock === 0 ? 'Sin stock' : 'Añadir al carrito'}
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default BookCard; 