import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  AttachMoney as MoneyIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const ProductoCard = ({ producto, onEliminar }) => {
  // Formatear moneda
  const formatearMoneda = (valor) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(valor);
  };

  // Formatear fecha
  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-AR');
  };

  // Determinar color del estado del stock
  const getStockColor = () => {
    if (producto.stockBajo) return 'error';
    if (producto.stock <= producto.stockMinimo * 1.5) return 'warning';
    return 'success';
  };

  // Obtener color de la categoría
  const getCategoriaColor = (categoria) => {
    const colores = {
      'Electrónicos': 'primary',
      'Ropa': 'secondary',
      'Hogar': 'success',
      'Deportes': 'warning',
      'Libros': 'info',
      'Otros': 'default'
    };
    return colores[categoria] || 'default';
  };

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'all 0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4
        },
        border: producto.stockBajo ? '1px solid' : 'none',
        borderColor: producto.stockBajo ? 'error.main' : 'transparent'
      }}
    >
      {/* Header con categoría y estado */}
      <Box sx={{ p: 2, pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Chip
            label={producto.categoria}
            size="small"
            color={getCategoriaColor(producto.categoria)}
            variant="outlined"
          />
          <Tooltip title={producto.stockBajo ? 'Stock bajo' : 'Stock normal'}>
            {producto.stockBajo ? (
              <WarningIcon color="error" />
            ) : (
              <CheckCircleIcon color="success" />
            )}
          </Tooltip>
        </Box>

        {/* Nombre y descripción */}
        <Typography variant="h6" component="h3" gutterBottom noWrap>
          {producto.nombre}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '2.5em'
          }}
        >
          {producto.descripcion}
        </Typography>
      </Box>

      {/* Contenido principal */}
      <CardContent sx={{ flexGrow: 1, pt: 1 }}>
        {/* Precio */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <MoneyIcon sx={{ mr: 1, color: 'success.main' }} />
          <Typography variant="h5" color="success.main" fontWeight="bold">
            {formatearMoneda(producto.precio)}
          </Typography>
        </Box>

        {/* Información de stock */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Stock actual:
            </Typography>
            <Chip
              label={`${producto.stock} unidades`}
              size="small"
              color={getStockColor()}
              variant={producto.stockBajo ? 'filled' : 'outlined'}
            />
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Stock mínimo:
            </Typography>
            <Typography variant="body2">
              {producto.stockMinimo} unidades
            </Typography>
          </Box>
        </Box>

        {/* Valor del inventario */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Valor inventario:
          </Typography>
          <Typography variant="body2" fontWeight="medium" color="primary">
            {formatearMoneda(producto.valorInventario)}
          </Typography>
        </Box>

        {/* Proveedor */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          <strong>Proveedor:</strong> {producto.proveedor}
        </Typography>

        {/* Estado */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          <strong>Estado:</strong> {producto.estado || 'Activo'}
        </Typography>

        {/* Fecha de creación */}
        <Typography variant="caption" color="text.secondary">
          Creado: {formatearFecha(producto.fechaCreacion)}
        </Typography>
      </CardContent>

      {/* Acciones */}
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          size="small"
          component={Link}
          to={`/productos/editar/${producto._id}`}
          startIcon={<EditIcon />}
          variant="outlined"
          fullWidth
        >
          Editar
        </Button>
        
        <IconButton
          size="small"
          onClick={() => onEliminar(producto._id)}
          color="error"
          sx={{ ml: 1 }}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>

      {/* Indicador de stock bajo */}
      {producto.stockBajo && (
        <Box 
          sx={{ 
            bgcolor: 'error.light', 
            color: 'error.contrastText', 
            p: 1, 
            textAlign: 'center' 
          }}
        >
          <Typography variant="caption" fontWeight="bold">
            ⚠️ STOCK BAJO - Reabastecer pronto
          </Typography>
        </Box>
      )}
    </Card>
  );
};

export default ProductoCard;