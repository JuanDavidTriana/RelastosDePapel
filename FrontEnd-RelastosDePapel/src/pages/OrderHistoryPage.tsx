import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Divider,
  Chip,
  Button,
} from '@mui/material';
import {
  LocalShipping as ShippingIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  HourglassEmpty as ProcessingIcon,
  Cancel as CancelIcon,
  Help as HelpIcon,
} from '@mui/icons-material';
import { useOrderHistory } from '../hooks/useOrderHistory';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const OrderHistoryPage: React.FC = () => {
  const { orders } = useOrderHistory();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completada':
        return 'success';
      case 'en proceso':
        return 'warning';
      case 'entregada':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string): React.ReactElement => {
    switch (status) {
      case 'pending':
        return <PendingIcon />;
      case 'processing':
        return <ProcessingIcon />;
      case 'shipped':
        return <ShippingIcon />;
      case 'delivered':
        return <CheckCircleIcon />;
      case 'cancelled':
        return <CancelIcon />;
      default:
        return <HelpIcon />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ flex: 1, bgcolor: 'background.default', py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            align="center"
            sx={{
              color: 'primary.main',
              fontWeight: 700,
              mb: 6,
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
            Historial de Compras
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Button
              variant="contained"
              component={Link}
              to="/"
              sx={{ px: 4 }}
            >
              Volver al menú
            </Button>
          </Box>

          {orders.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                No tienes compras realizadas
              </Typography>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {orders.map((order) => (
                <Grid item xs={12} key={order.id}>
                  <Paper sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" sx={{ color: 'primary.main' }}>
                        Orden #{order.id}
                      </Typography>
                      <Chip
                        icon={getStatusIcon(order.status)}
                        label={order.status}
                        color={getStatusColor(order.status)}
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {formatDate(order.date)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Método de pago: {order.paymentMethod}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Grid container spacing={2}>
                      {order.items.map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item.id}>
                          <Box sx={{ display: 'flex', gap: 2 }}>
                            <Box
                              component="img"
                              src={item.imageUrl}
                              alt={item.title}
                              sx={{
                                width: 60,
                                height: 80,
                                objectFit: 'cover',
                                borderRadius: 1,
                              }}
                            />
                            <Box>
                              <Typography variant="subtitle2">{item.title}</Typography>
                              <Typography variant="body2" color="text.secondary">
                                {item.author}
                              </Typography>
                              <Typography variant="body2" color="primary.main">
                                ${item.price.toFixed(2)} x {item.quantity}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h6">Total:</Typography>
                      <Typography variant="h6" color="primary.main">
                        ${order.total.toFixed(2)}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default OrderHistoryPage; 