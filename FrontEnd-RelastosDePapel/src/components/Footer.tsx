import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Stack,
  Link,
  Divider,
  alpha,
  Button,
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  YouTube as YouTubeIcon,
} from '@mui/icons-material';
import logo from '../assets/images/logoRelatosDePapel.png';

const socialLinks = [
  { icon: <FacebookIcon />, name: 'Facebook', url: 'https://facebook.com' },
  { icon: <InstagramIcon />, name: 'Instagram', url: 'https://instagram.com' },
  { icon: <TwitterIcon />, name: 'Twitter', url: 'https://twitter.com' },
  { icon: <YouTubeIcon />, name: 'YouTube', url: 'https://youtube.com' },
];

const footerLinks = {
  'Acerca de': ['Nuestra Historia', 'Blog', 'Prensa', 'Trabaja con Nosotros'],
  'Ayuda': ['FAQ', 'Envíos', 'Devoluciones', 'Estado del Pedido'],
  'Legal': ['Términos y Condiciones', 'Política de Privacidad', 'Cookies'],
};

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.default',
        pt: 8,
        pb: 3,
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo y Redes Sociales */}
          <Grid item xs={12} md={4}>
            <Box
              component="img"
              src={logo}
              alt="Relatos de Papel"
              sx={{ height: 100, mb: 5 }}
            />
            <Typography variant="body2" color="text.secondary" paragraph>
              Tu librería de confianza, donde cada historia cobra vida.
            </Typography>
            <Stack direction="row" spacing={1}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.name}
                  component={Link}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'primary.main',
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                    '&:hover': {
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* Enlaces */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <Grid item xs={12} sm={6} md={2} key={category}>
              <Typography
                variant="subtitle1"
                color="text.primary"
                gutterBottom
                sx={{ fontWeight: 'bold' }}
              >
                {category}
              </Typography>
              <Stack spacing={1}>
                {links.map((link) => (
                  <Link
                    key={link}
                    href="#"
                    underline="hover"
                    color="text.secondary"
                    sx={{
                      '&:hover': {
                        color: 'primary.main',
                      },
                    }}
                  >
                    {link}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}

          {/* Newsletter */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="subtitle1"
              color="text.primary"
              gutterBottom
              sx={{ fontWeight: 'bold' }}
            >
              Suscríbete a nuestra newsletter
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Recibe las últimas novedades y ofertas exclusivas directamente en tu correo.
            </Typography>
            <Box
              component="form"
              sx={{
                display: 'flex',
                gap: 1,
                '& .MuiInputBase-root': {
                  borderRadius: 30,
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                  px: 2,
                  py: 1,
                },
              }}
            >
              <input
                type="email"
                placeholder="Tu correo electrónico"
                style={{
                  border: 'none',
                  outline: 'none',
                  width: '100%',
                  backgroundColor: 'transparent',
                  fontSize: '0.875rem',
                }}
              />
              <Button
                variant="contained"
                sx={{
                  borderRadius: 30,
                  px: 3,
                  whiteSpace: 'nowrap',
                }}
              >
                Suscribirse
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Copyright */}
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
        >
          © {new Date().getFullYear()} Relatos de Papel. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  );
} 