import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Drawer } from '@mui/material';
import Home from './pages/Home';
import CatalogPage from './pages/CatalogPage';
import ContactPage from './pages/ContactPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import { CartProvider, useCart } from './hooks/useCart';
import { OrderHistoryProvider } from './hooks/useOrderHistory';
import CartDropdown from './components/CartDropdown';
import theme from './theme';

function AppContent() {
  const { cartOpen, closeCart } = useCart();

  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<CatalogPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/historial" element={<OrderHistoryPage />} />
      </Routes>
      
      {/* Drawer global del carrito */}
      <Drawer
        anchor="right"
        open={cartOpen}
        onClose={closeCart}
        PaperProps={{ 
          sx: { 
            width: { xs: '100%', sm: 400, md: 420 }, 
            maxWidth: '100vw',
            bgcolor: '#fffdfa',
            boxShadow: '-4px 0 20px rgba(0,0,0,0.15)',
          } 
        }}
        sx={{
          '& .MuiDrawer-paper': {
            border: 'none',
          },
        }}
      >
        <CartDropdown onClose={closeCart} />
      </Drawer>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CartProvider>
          <OrderHistoryProvider>
            <AppContent />
          </OrderHistoryProvider>
        </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App; 