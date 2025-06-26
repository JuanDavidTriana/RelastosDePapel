import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
} from '@mui/material';

interface Author {
  id: number;
  name: string;
  biography: string;
  imageUrl: string;
}

export default function Authors() {
  const [authors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Aquí irá la llamada a la API cuando esté disponible
    setLoading(false);
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Nuestros Autores
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {authors.map((author) => (
              <Grid item xs={12} sm={6} md={4} key={author.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={author.imageUrl}
                    alt={author.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {author.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {author.biography}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
} 