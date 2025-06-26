import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer } from '@mui/material';
import { ShoppingCart, Person, MenuBook } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import CartDropdown from '../CartDropdown';

export const Navbar = () => {
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <AppBar
      position="sticky"
      elevation={2}
      sx={{
        bgcolor: '#fff',
        color: 'primary.main',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        borderBottom: '2px solid #f3e9e1',
        zIndex: 1200,
      }}
    >
      <Toolbar sx={{ minHeight: 70 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            cursor: 'pointer',
            mr: 4,
          }}
          onClick={() => navigate('/')}
        >
          <MenuBook sx={{ fontSize: 40, color: 'primary.main' }} />
          <Typography
            variant="h4"
            component="div"
            sx={{ fontWeight: 700, letterSpacing: 1, fontFamily: 'Montserrat, sans-serif', fontSize: { xs: '1.5rem', md: '2rem' } }}
          >
            Relatos de Papel
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flexGrow: 1 }}>
          <Button
            sx={{
              color: 'primary.main',
              fontWeight: 700,
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              px: 2.5,
              borderRadius: 2,
              textTransform: 'none',
              letterSpacing: 0.5,
              '&:hover': { bgcolor: '#f3e9e1', color: 'primary.dark' },
            }}
            onClick={() => navigate('/catalogo')}
          >
            Catálogo
          </Button>
          <Button
            sx={{
              color: 'primary.main',
              fontWeight: 700,
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              px: 2.5,
              borderRadius: 2,
              textTransform: 'none',
              letterSpacing: 0.5,
              '&:hover': { bgcolor: '#f3e9e1', color: 'primary.dark' },
            }}
            onClick={() => navigate('/contacto')}
          >
            Contacto
          </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <IconButton color="primary" onClick={() => setCartOpen(true)} sx={{ p: 2 }}>
            <ShoppingCart sx={{ fontSize: 36 }} />
          </IconButton>
          <IconButton color="primary" onClick={() => navigate('/historial')} sx={{ p: 1.5 }}>
            <Person sx={{ fontSize: 30 }} />
          </IconButton>
        </Box>
      </Toolbar>
      <Drawer
        anchor="right"
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        PaperProps={{ sx: { width: { xs: '100%', sm: 400, md: 420 }, maxWidth: '100vw' } }}
      >
        <CartDropdown anchorEl={cartOpen ? document.body : null} onClose={() => setCartOpen(false)} />
      </Drawer>
    </AppBar>
  );
}; 