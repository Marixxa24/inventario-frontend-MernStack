import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Home as HomeIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center',
          gap: 3
        }}
      >
        {/* error del cof}difo */}
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: { xs: '6rem', md: '8rem' },
            fontWeight: 'bold',
            color: 'primary.main',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          404
        </Typography>

        {/* Error del mensaje */}
        <Typography variant="h4" component="h2" gutterBottom>
          Página no encontrada
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
          Puede que hayas escrito mal la URL o que el enlace esté roto.
        </Typography>

        {/* Illustration icon */}
        <Box sx={{ fontSize: '4rem', mb: 2 }}>
          📦🔍
        </Box>

        {/* Action de los  Buttons */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<HomeIcon />}
            component={Link}
            to="/"
          >
            Ir al Inicio
          </Button>

          <Button
            variant="outlined"
            size="large"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            Volver Atrás
          </Button>
        </Box>

        {/* Helpful Links */}
        <Box sx={{ mt: 4, display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Enlaces útiles:  continua en desarrollo
          </Typography>
          <Link to="/productos" style={{ textDecoration: 'none' }}>
            <Typography variant="body2" color="primary.main">
              Ver Productos
            </Typography>
          </Link>
          <Typography variant="body2" color="text.secondary">•</Typography>
          <Link to="/productos/nuevo" style={{ textDecoration: 'none' }}>
            <Typography variant="body2" color="primary.main">
              Agregar Producto
            </Typography>
          </Link>
          <Typography variant="body2" color="text.secondary">•</Typography>
          <Link to="/stock-bajo" style={{ textDecoration: 'none' }}>
            <Typography variant="body2" color="primary.main">
              Stock Bajo
            </Typography>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default NotFound;