import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Chip,
} from '@mui/material';
import {
  CreditCard as CreditCardIcon,
  AccountBalance as BankIcon,
  Payment as PaymentIcon,
  Receipt as ReceiptIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { useCart } from '../hooks/useCart';
import { useOrderHistory } from '../hooks/useOrderHistory';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { MultiplePurchaseResponse } from '../types';

const steps = ['Resumen de compra', 'Método de pago', 'Confirmación', 'Éxito'];

const CheckoutPage: React.FC = () => {
  const { items, total, clearCart, processPurchase, purchaseLoading } = useCart();
  const { addOrder } = useOrderHistory();
  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [shippingName, setShippingName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingPhone, setShippingPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [formError, setFormError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseResult, setPurchaseResult] = useState<MultiplePurchaseResponse | null>(null);
  const navigate = useNavigate();

  // Si el carrito está vacío, mostrar mensaje y botón para volver al catálogo
  if (items.length === 0 && activeStep === 0) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Box sx={{ flex: 1, bgcolor: 'background.default', py: 8 }}>
          <Container maxWidth="sm">
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>
                Tu carrito está vacío
              </Typography>
              <Typography variant="body1" gutterBottom>
                Agrega productos para continuar con el proceso de compra.
              </Typography>
              <Button
                variant="contained"
                component={Link}
                to="/catalogo"
                sx={{ mt: 2 }}
              >
                Volver al catálogo
              </Button>
            </Paper>
          </Container>
        </Box>
        <Footer />
      </Box>
    );
  }

  const handleNext = () => {
    // Validación para el paso 1 (dirección de envío)
    if (activeStep === 0) {
      if (!shippingName || !shippingAddress || !shippingPhone || !customerEmail) {
        setFormError('Por favor completa todos los campos de dirección de envío.');
        return;
      }
      setFormError('');
    }
    // Validación para el paso 2 (pago)
    if (activeStep === 1 && paymentMethod !== 'transfer') {
      if (!cardNumber || !cardName || !cardExpiry || !cardCVC) {
        setFormError('Por favor completa todos los campos de pago.');
        return;
      }
      setFormError('');
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value);
  };

  const handleFinalizePurchase = async () => {
    setIsProcessing(true);
    setFormError('');

    try {
      // Procesar la compra con el backend usando el email del cliente
      const { success, result, error } = await processPurchase(customerEmail);
      
      if (success) {
        // Guardar el resultado de la compra
        setPurchaseResult(result);
        
        // Guardar en historial local
        addOrder({
          items: items.map(item => ({
            id: item.id.toString(),
            title: item.title,
            author: item.author,
            price: item.price,
            quantity: item.quantity,
            imageUrl: item.coverImage || '',
          })),
          total,
          status: 'completada',
          paymentMethod: paymentMethod === 'credit' ? 'Tarjeta de crédito' :
                        paymentMethod === 'debit' ? 'Tarjeta de débito' :
                        'Transferencia bancaria',
        });
        
        // Mostrar confirmación exitosa
        setActiveStep(3); // Ir al paso de confirmación
      } else {
        setFormError(error || 'Error al procesar la compra. Por favor intenta de nuevo.');
      }
    } catch (error) {
      setFormError('Error al procesar la compra. Por favor intenta de nuevo.');
      console.error('Error during purchase:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                  Productos en el carrito
                </Typography>
                {items.map((item) => (
                  <Box key={item.id} sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      component="img"
                      src={item.coverImage || ''}
                      alt={item.title}
                      sx={{ width: 60, height: 80, objectFit: 'cover', borderRadius: 1, boxShadow: 1 }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1">{item.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.author}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Cantidad: {item.quantity}
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="primary.main" sx={{ minWidth: 80, textAlign: 'right' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                ))}
              </Paper>
              <Paper sx={{ p: 3, mt: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                  Información de contacto y envío
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Nombre completo"
                      value={shippingName}
                      onChange={(e) => setShippingName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Teléfono"
                      value={shippingPhone}
                      onChange={(e) => setShippingPhone(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Dirección de envío"
                      multiline
                      rows={3}
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
                <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                  Resumen de la orden
                </Typography>
                {items.map((item) => (
                  <Box key={item.id} sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
                        {item.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Cantidad: {item.quantity}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="primary.main">
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                ))}
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6" color="primary.main">
                    ${total.toFixed(2)}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                  Método de pago
                </Typography>
                <FormControl component="fieldset" sx={{ mb: 3 }}>
                  <RadioGroup value={paymentMethod} onChange={handlePaymentMethodChange}>
                    <FormControlLabel
                      value="credit"
                      control={<Radio />}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CreditCardIcon />
                          <Typography>Tarjeta de crédito</Typography>
                        </Box>
                      }
                    />
                    <FormControlLabel
                      value="debit"
                      control={<Radio />}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CreditCardIcon />
                          <Typography>Tarjeta de débito</Typography>
                        </Box>
                      }
                    />
                    <FormControlLabel
                      value="transfer"
                      control={<Radio />}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <BankIcon />
                          <Typography>Transferencia bancaria</Typography>
                        </Box>
                      }
                    />
                  </RadioGroup>
                </FormControl>

                {(paymentMethod === 'credit' || paymentMethod === 'debit') && (
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Número de tarjeta"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="1234 5678 9012 3456"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Nombre en la tarjeta"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Fecha de vencimiento"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/AA"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="CVC"
                        value={cardCVC}
                        onChange={(e) => setCardCVC(e.target.value)}
                        placeholder="123"
                      />
                    </Grid>
                  </Grid>
                )}

                {paymentMethod === 'transfer' && (
                  <Box sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Información de transferencia
                    </Typography>
                    <Typography variant="body2" paragraph>
                      Banco: Banco Ejemplo
                    </Typography>
                    <Typography variant="body2" paragraph>
                      Cuenta: 1234-5678-9012-3456
                    </Typography>
                    <Typography variant="body2" paragraph>
                      Titular: Relatos de Papel S.A.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Una vez realizada la transferencia, envíanos el comprobante a info@relatosdepapel.com
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
                <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                  Resumen de la orden
                </Typography>
                {items.map((item) => (
                  <Box key={item.id} sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
                        {item.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Cantidad: {item.quantity}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="primary.main">
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                ))}
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6" color="primary.main">
                    ${total.toFixed(2)}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                <ReceiptIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Confirmar compra
                </Typography>
                <Typography variant="body1" paragraph>
                  Revisa los detalles de tu compra antes de confirmar.
                </Typography>
                
                <Box sx={{ textAlign: 'left', maxWidth: 400, mx: 'auto', mt: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Información de envío:
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Nombre:</strong> {shippingName}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Email:</strong> {customerEmail}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Teléfono:</strong> {shippingPhone}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Dirección:</strong> {shippingAddress}
                  </Typography>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="h6" gutterBottom>
                    Método de pago:
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {paymentMethod === 'credit' ? 'Tarjeta de crédito' :
                     paymentMethod === 'debit' ? 'Tarjeta de débito' :
                     'Transferencia bancaria'}
                  </Typography>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="h6" gutterBottom>
                    Total a pagar:
                  </Typography>
                  <Typography variant="h5" color="primary.main" sx={{ fontWeight: 'bold' }}>
                    ${total.toFixed(2)}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
                <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                  Productos
                </Typography>
                {items.map((item) => (
                  <Box key={item.id} sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
                        {item.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Cantidad: {item.quantity}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="primary.main">
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                ))}
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6" color="primary.main">
                    ${total.toFixed(2)}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <CheckCircleIcon sx={{ fontSize: 80, color: 'success.main', mb: 3 }} />
                <Typography variant="h4" gutterBottom sx={{ color: 'success.main', fontWeight: 'bold' }}>
                  ¡Compra Exitosa!
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                  Tu pedido ha sido procesado correctamente
                </Typography>
                
                <Box sx={{ mt: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2, textAlign: 'left' }}>
                  <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                    Detalles de la compra:
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Email:</strong> {customerEmail}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Total procesado:</strong> ${total.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Productos:</strong> {items.length} {items.length === 1 ? 'libro' : 'libros'}
                    </Typography>
                    {purchaseResult && (
                      <>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Compras procesadas:</strong> {purchaseResult.purchases?.length || 0}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Estado:</strong> {purchaseResult.status}
                        </Typography>
                      </>
                    )}
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="body2" paragraph>
                    Hemos enviado un email de confirmación a <strong>{customerEmail}</strong> con los detalles de tu compra.
                  </Typography>
                  
                  <Typography variant="body2" paragraph>
                    Tu pedido será procesado y enviado a la dirección proporcionada en los próximos días hábiles.
                  </Typography>
                </Box>
                
                <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    component={Link}
                    to="/catalogo"
                    sx={{ bgcolor: 'primary.main' }}
                  >
                    Seguir Comprando
                  </Button>
                  <Button
                    variant="outlined"
                    component={Link}
                    to="/historial"
                    sx={{ borderColor: 'primary.main', color: 'primary.main' }}
                  >
                    Ver Historial
                  </Button>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
                <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                  Productos comprados
                </Typography>
                {items.map((item) => (
                  <Box key={item.id} sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
                        {item.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Cantidad: {item.quantity}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="primary.main">
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                ))}
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6" color="primary.main">
                    ${total.toFixed(2)}
                  </Typography>
                </Box>
                <Chip 
                  label="Compra Confirmada" 
                  color="success" 
                  icon={<CheckCircleIcon />}
                  sx={{ width: '100%', mt: 2 }}
                />
              </Paper>
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ flex: 1, bgcolor: 'background.default', py: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4, color: 'primary.main', fontWeight: 700 }}>
            Finalizar Compra
          </Typography>

          {formError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {formError}
            </Alert>
          )}

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {renderStepContent(activeStep)}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              disabled={activeStep === 0 || activeStep === 3}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Atrás
            </Button>
            <Box>
              {activeStep === 2 ? (
                <Button
                  variant="contained"
                  onClick={handleFinalizePurchase}
                  disabled={isProcessing || purchaseLoading}
                  sx={{
                    bgcolor: 'primary.main',
                    color: '#fff',
                    '&:hover': { bgcolor: 'primary.dark' },
                  }}
                >
                  {isProcessing || purchaseLoading ? 'Procesando...' : 'Confirmar Compra'}
                </Button>
              ) : activeStep < 2 ? (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{
                    bgcolor: 'primary.main',
                    color: '#fff',
                    '&:hover': { bgcolor: 'primary.dark' },
                  }}
                >
                  Siguiente
                </Button>
              ) : null}
            </Box>
          </Box>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default CheckoutPage; 