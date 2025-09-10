import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import InventoryIcon from '@mui/icons-material/Inventory';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import WarningIcon from '@mui/icons-material/Warning';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar 
      position="static" 
      elevation={2}
      sx={{ backgroundColor: '#10282A' }} // Fondo navbar
    >
      <Toolbar>
        <InventoryIcon sx={{ mr: 2, color: '#D3C3B9' }} /> 
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1, color: '#D3C3B9' }} // Título beige
        >
          Sistema de Inventario
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            component={Link}
            to="/"
            startIcon={<HomeIcon />}
            variant={isActive('/') ? 'outlined' : 'text'}
            sx={{
              color: '#D3C3B9',
              borderColor: '#B58863',
              '&:hover': { backgroundColor: '#3D4D55', color: '#FFFFFF' }
            }}
          >
            Home
          </Button>
          
          <Button
            component={Link}
            to="/productos"
            startIcon={<InventoryIcon />}
            variant={isActive('/productos') ? 'outlined' : 'text'}
            sx={{
              color: '#D3C3B9',
              borderColor: '#B58863',
              '&:hover': { backgroundColor: '#3D4D55', color: '#FFFFFF' }
            }}
          >
            Productos
          </Button>
          
          <Button
            component={Link}
            to="/productos/nuevo"
            startIcon={<AddIcon />}
            variant={isActive('/productos/nuevo') ? 'outlined' : 'text'}
            sx={{
              color: '#D3C3B9',
              borderColor: '#B58863',
              '&:hover': { backgroundColor: '#B58863', color: '#161616' }
            }}
          >
            Agregar
          </Button>
          
          <Button
            component={Link}
            to="/stock-bajo"
            startIcon={<WarningIcon />}
            variant={isActive('/stock-bajo') ? 'outlined' : 'text'}
            sx={{
              color: '#D3C3B9',
              borderColor: '#B58863',
              '&:hover': { backgroundColor: '#A79E9C', color: '#161616' }
            }}
          >
            Stock Bajo
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
