import React from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  IconButton,
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
} from '@mui/icons-material';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ContactPage: React.FC = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log('Formulario enviado');
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
            Contacto
          </Typography>

          <Grid container spacing={4}>
            {/* Información de contacto */}
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
                  Información de Contacto
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <EmailIcon color="primary" sx={{ mr: 2 }} />
                    <Typography>info@relatosdepapel.com</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PhoneIcon color="primary" sx={{ mr: 2 }} />
                    <Typography>+57 123 456 7890</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationIcon color="primary" sx={{ mr: 2 }} />
                    <Typography>Calle 15 # 23-45<br />Ibagué, Tolima, Colombia</Typography>
                  </Box>
                </Box>

                <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', mt: 4, mb: 2 }}>
                  Síguenos
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <IconButton color="primary" sx={{ '&:hover': { transform: 'scale(1.1)' } }}>
                    <FacebookIcon />
                  </IconButton>
                  <IconButton color="primary" sx={{ '&:hover': { transform: 'scale(1.1)' } }}>
                    <InstagramIcon />
                  </IconButton>
                  <IconButton color="primary" sx={{ '&:hover': { transform: 'scale(1.1)' } }}>
                    <TwitterIcon />
                  </IconButton>
                </Box>
              </Paper>
            </Grid>

            {/* Formulario de contacto */}
            <Grid item xs={12} md={8}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
                  Envíanos un mensaje
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Nombre"
                        variant="outlined"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        variant="outlined"
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Asunto"
                        variant="outlined"
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Mensaje"
                        multiline
                        rows={4}
                        variant="outlined"
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{
                          px: 4,
                          py: 1.5,
                          borderRadius: 2,
                          textTransform: 'none',
                          fontSize: '1.1rem',
                        }}
                      >
                        Enviar mensaje
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default ContactPage; 