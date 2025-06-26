import { CardMedia, CardContent, Typography, Paper } from '@mui/material';

interface BookCardProps {
  title: string;
  author: string;
  imageUrl: string;
}

export default function BookCard({ title, author, imageUrl }: BookCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        maxWidth: 280,
        width: '100%',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        bgcolor: 'background.paper'
      }}
    >
      <CardMedia
        component="img"
        height="320"
        image={imageUrl}
        alt={title}
        sx={{ 
          objectFit: 'contain',
          p: 2,
          bgcolor: '#FDF6F2'
        }}
      />
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography 
          gutterBottom 
          variant="h6" 
          component="div"
          sx={{ 
            fontWeight: 'bold',
            color: 'primary.main',
            fontSize: '1.1rem'
          }}
        >
          {title}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ fontSize: '0.9rem' }}
        >
          {author}
        </Typography>
      </CardContent>
    </Paper>
  );
} 