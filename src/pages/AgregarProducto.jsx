import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Save as SaveIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useInventario } from '../context/InventarioContext';
import { productosAPI } from '../services/productosAPI';
import ProductoForm from '../components/productos/ProductoForm';
import Alert from '../components/alerts/Alert';

const AgregarProducto = () => {
  const navigate = useNavigate();
  const { dispatch, ACTIONS, showAlert, alert } = useInventario();
  const [guardando, setGuardando] = useState(false);

  // Datos iniciales del formulario
  const productoInicial = {
    nombre: '',
    descripcion: '',
    categoria: '',
    precio: '',
    stock: '',
    stockMinimo: '',
    proveedor: '',
    estado: 'Activo'
  };

const handleSubmit = async (datosProducto) => {
  try {
    setGuardando(true);

    // Construimos el objeto con valores por defecto y conversión segura
    const producto = {
      nombre: datosProducto.nombre || '',
      descripcion: datosProducto.descripcion || '',
      categoria: datosProducto.categoria || '',
      precio: parseFloat(datosProducto.precio) || 0,
      stock: parseInt(datosProducto.stock) || 0,
      stockMinimo: parseInt(datosProducto.stockMinimo) || 0,
      proveedor: datosProducto.proveedor || '',
      estado: datosProducto.estado || 'Activo'
    };

    // Validación básica antes de enviar
    if (
      !producto.nombre ||
      !producto.categoria ||
      !producto.proveedor ||
      producto.precio <= 0 ||
      producto.stock < 0 ||
      producto.stockMinimo < 0
    ) {
      showAlert('Completa todos los campos correctamente', 'error');
      setGuardando(false);
      return;
    }

    console.log('Datos a enviar a la API:', producto); // Para depuración

    // Llamada a la API
    const nuevoProducto = await productosAPI.crearProducto(producto);

    // Actualizamos estado global
    dispatch({ type: ACTIONS.ADD_PRODUCTO, payload: nuevoProducto });

    // Mostrar mensaje de éxito
    showAlert(`Producto "${nuevoProducto.nombre}" creado exitosamente`, 'success');

    // Redirigir después de un breve delay
    setTimeout(() => navigate('/productos'), 1500);

  } catch (error) {
    console.error('Error al crear producto:', error);
    showAlert(error.message, 'error');
  } finally {
    setGuardando(false);
  }
};


  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          component={Link}
          to="/productos"
          startIcon={<ArrowBackIcon />}
          sx={{ mr: 2 }}
        >
          Volver
        </Button>
        <Typography variant="h4" component="h1">
          Agregar Nuevo Producto
        </Typography>
      </Box>

      {/* Alerta */}
      {alert && <Alert />}

      {/* Formulario */}
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom color="primary">
          Información del Producto
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Completa todos los campos requeridos para agregar un nuevo producto al inventario.
        </Typography>

        <ProductoForm
          producto={productoInicial}
          onSubmit={handleSubmit}
          guardando={guardando}
          textoBotón="Crear Producto"
          iconoBotón={<SaveIcon />}
        />
      </Paper>

      {/* Información adicional */}
      <Box sx={{ mt: 3, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
        <Typography variant="subtitle2" color="info.dark" gutterBottom>
          💡 Información importante:
        </Typography>
        <Typography variant="body2" color="info.dark">
          • El sistema calculará automáticamente si el stock está bajo comparándolo con el stock mínimo
        </Typography>
        <Typography variant="body2" color="info.dark">
          • El valor del inventario se calculará automáticamente multiplicando precio × stock
        </Typography>
        <Typography variant="body2" color="info.dark">
          • Asegúrate de seleccionar la categoría correcta para facilitar la organización
        </Typography>
      </Box>
    </Container>
  );
};

export default AgregarProducto;
