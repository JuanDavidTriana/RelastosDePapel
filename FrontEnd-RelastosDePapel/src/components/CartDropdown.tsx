import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingCart as ShoppingCartIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';

interface CartDropdownProps {
  onClose: () => void;
}

const CartDropdown: React.FC<CartDropdownProps> = ({ onClose }) => {
  const { items, removeFromCart, updateQuantity, total } = useCart();

  const handleQuantityChange = (bookId: number, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      updateQuantity(bookId, newQuantity);
    } else {
      removeFromCart(bookId);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#fffdfa',
        p: 0,
        position: 'relative',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 3, pb: 2, borderBottom: '1.5px solid #f3e9e1' }}>
        <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 700 }}>
          Carrito de Compras
        </Typography>
        <IconButton onClick={onClose} size="large">
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ flex: 1, overflowY: 'auto', p: 3, pt: 2 }}>
        {items.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <ShoppingCartIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 1 }} />
            <Typography color="text.secondary">
              Tu carrito está vacío
            </Typography>
          </Box>
        ) : (
          <>
            {items.map((item) => (
              <Box key={item.id} sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    component="img"
                    src={item.coverImage || 'https://via.placeholder.com/60x80?text=No+Image'}
                    alt={item.title}
                    sx={{
                      width: 60,
                      height: 80,
                      objectFit: 'cover',
                      borderRadius: 2,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      bgcolor: '#f5f5f5',
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" noWrap sx={{ fontWeight: 600 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.author}
                    </Typography>
                    <Typography variant="body2" color="primary.main" sx={{ mt: 0.5, fontWeight: 700 }}>
                      ${item.price.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography>{item.quantity}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                <Divider sx={{ my: 1.5 }} />
              </Box>
            ))}
          </>
        )}
      </Box>
      <Box sx={{ p: 3, borderTop: '1.5px solid #f3e9e1', bgcolor: '#fffdfa' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Total:</Typography>
          <Typography variant="subtitle1" color="primary.main" sx={{ fontWeight: 700 }}>
            ${total.toFixed(2)}
          </Typography>
        </Box>
        <Button
          component={Link}
          to="/checkout"
          variant="contained"
          fullWidth
          onClick={onClose}
          sx={{
            py: 1.3,
            borderRadius: 3,
            textTransform: 'none',
            fontWeight: 700,
            fontSize: '1.1rem',
            bgcolor: 'primary.main',
            color: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            '&:hover': { bgcolor: 'primary.dark' },
          }}
        >
          Proceder al pago
        </Button>
      </Box>
    </Box>
  );
};

export default CartDropdown; 