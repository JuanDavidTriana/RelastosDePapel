import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#E6A17C', // Color salmón/terracota
      light: '#F4C3A8',
      dark: '#B87B5E',
    },
    secondary: {
      main: '#4A4A4A', // Gris oscuro
      light: '#6E6E6E',
      dark: '#2E2E2E',
    },
    background: {
      default: '#FDF6F2', // Fondo beige claro
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2E2E2E',
      secondary: '#4A4A4A',
    }
  },
  typography: {
    fontFamily: '"Lora", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.5rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          textTransform: 'none',
          fontWeight: 500,
          padding: '10px 30px',
        },
        contained: {
          backgroundColor: '#E6A17C',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#B87B5E',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: 'none',
          border: '1px solid #E0E0E0',
        },
      },
    },
  },
});

export default theme; 