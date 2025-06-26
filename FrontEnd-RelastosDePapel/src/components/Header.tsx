import { 
  AppBar, 
  Toolbar, 
  Box, 
  IconButton,
  styled,
  Badge,
} from '@mui/material';
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import logo from '../assets/images/logoRelatosDePapel.png';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const NavLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  padding: '8px 16px',
  borderRadius: theme.shape.borderRadius,
  transition: 'background-color 0.3s',
  '&:hover': {
    backgroundColor: '#FDF6F2',
  },
}));

export default function Header() {
  const { items, openCart } = useCart();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: 'white',
        boxShadow: 'none',
        borderBottom: '1px solid',
        borderColor: 'primary.light',
        py: 2
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: { xs: '80px', md: '100px' } }}>
        <Box 
          component={Link} 
          to="/" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            textDecoration: 'none',
            ml: { xs: -1, md: 0 }
          }}
        >
          <Box 
            component="img"
            src={logo}
            alt="Logo"
            sx={{ 
              height: { xs: 100, md: 120 },
              width: 'auto',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          />
        </Box>

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: { xs: 1, md: 2 },
          mr: { xs: 1, md: 3 }
        }}>
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/catalogo">Catálogo</NavLink>
          <NavLink to="/contacto">Contacto</NavLink>
          <IconButton 
            color="primary"
            onClick={openCart}
            sx={{ 
              ml: { xs: 0.5, md: 1 },
              '&:hover': {
                backgroundColor: '#FDF6F2',
              }
            }}
          >
            <Badge badgeContent={totalItems} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
} 