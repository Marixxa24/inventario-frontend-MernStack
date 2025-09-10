import React, { useState, useEffect } from 'react';
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Box,
  Typography
} from '@mui/material';
import { CATEGORIAS, ESTADOS } from '../../services/productosAPI';

const ProductoForm = ({ 
  producto, 
  onSubmit, 
  guardando = false, 
  textoBotón = "Guardar",
  iconoBotón = null 
}) => {
  const [formData, setFormData] = useState(producto);
  const [errores, setErrores] = useState({});

  // Actualizar formData cuando cambie el producto
  useEffect(() => {
    setFormData(producto);
  }, [producto]);

  // Validaciones
  const validarCampo = (nombre, valor) => {
    const nuevosErrores = { ...errores };

    switch (nombre) {
      case 'nombre':
        if (!valor.trim()) {
          nuevosErrores.nombre = 'El nombre es requerido';
        } else if (valor.length < 2) {
          nuevosErrores.nombre = 'El nombre debe tener al menos 2 caracteres';
        } else {
          delete nuevosErrores.nombre;
        }
        break;

      case 'descripcion':
        if (!valor.trim()) {
          nuevosErrores.descripcion = 'La descripción es requerida';
        } else if (valor.length < 10) {
          nuevosErrores.descripcion = 'La descripción debe tener al menos 10 caracteres';
        } else {
          delete nuevosErrores.descripcion;
        }
        break;

      case 'categoria':
        if (!valor) {
          nuevosErrores.categoria = 'La categoría es requerida';
        } else {
          delete nuevosErrores.categoria;
        }
        break;

      case 'precio':
        const precio = parseFloat(valor);
        if (!valor || isNaN(precio) || precio <= 0) {
          nuevosErrores.precio = 'El precio debe ser un número mayor a 0';
        } else {
          delete nuevosErrores.precio;
        }
        break;

      case 'stock':
        const stock = parseInt(valor);
        if (!valor || isNaN(stock) || stock < 0) {
          nuevosErrores.stock = 'El stock debe ser un número igual o mayor a 0';
        } else {
          delete nuevosErrores.stock;
        }
        break;

      case 'stockMinimo':
        const stockMinimo = parseInt(valor);
        if (!valor || isNaN(stockMinimo) || stockMinimo < 0) {
          nuevosErrores.stockMinimo = 'El stock mínimo debe ser un número igual o mayor a 0';
        } else {
          delete nuevosErrores.stockMinimo;
        }
        break;

      case 'proveedor':
        if (!valor.trim()) {
          nuevosErrores.proveedor = 'El proveedor es requerido';
        } else if (valor.length < 2) {
          nuevosErrores.proveedor = 'El proveedor debe tener al menos 2 caracteres';
        } else {
          delete nuevosErrores.proveedor;
        }
        break;

      default:
        break;
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validar campo en tiempo real
    validarCampo(name, value);
  };

  const validarFormulario = () => {
    const camposRequeridos = ['nombre', 'descripcion', 'categoria', 'precio', 'stock', 'stockMinimo', 'proveedor'];
    let formularioValido = true;

    camposRequeridos.forEach(campo => {
      if (!validarCampo(campo, formData[campo])) {
        formularioValido = false;
      }
    });

    return formularioValido;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validarFormulario()) {
      onSubmit(formData);
    }
  };

  // Calcular valor estimado del inventario
  const valorEstimado = () => {
    const precio = parseFloat(formData.precio) || 0;
    const stock = parseInt(formData.stock) || 0;
    return precio * stock;
  };

  const formatearMoneda = (valor) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(valor);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Grid container spacing={3}>
        {/* Nombre */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            name="nombre"
            label="Nombre del producto"
            value={formData.nombre || ''}
            onChange={handleChange}
            error={!!errores.nombre}
            helperText={errores.nombre}
            placeholder="Ej: iPhone 13 Pro"
          />
        </Grid>

        {/* Categoría */}
        <Grid item xs={12} md={6}>
          <FormControl required fullWidth error={!!errores.categoria}>
            <InputLabel>Categoría</InputLabel>
            <Select
              name="categoria"
              value={formData.categoria || ''}
              label="Categoría"
              onChange={handleChange}
            >
              {CATEGORIAS.map((categoria) => (
                <MenuItem key={categoria} value={categoria}>
                  {categoria}
                </MenuItem>
              ))}
            </Select>
            {errores.categoria && (
              <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                {errores.categoria}
              </Typography>
            )}
          </FormControl>
        </Grid>

        {/* Descripción */}
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            multiline
            rows={3}
            name="descripcion"
            label="Descripción"
            value={formData.descripcion || ''}
            onChange={handleChange}
            error={!!errores.descripcion}
            helperText={errores.descripcion || 'Describe las características principales del producto'}
            placeholder="Describe las características, especificaciones y detalles importantes del producto..."
          />
        </Grid>

        {/* Precio */}
        <Grid item xs={12} md={4}>
          <TextField
            required
            fullWidth
            type="number"
            name="precio"
            label="Precio"
            value={formData.precio || ''}
            onChange={handleChange}
            error={!!errores.precio}
            helperText={errores.precio}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
              inputProps: { min: 0, step: 0.01 }
            }}
            placeholder="0.00"
          />
        </Grid>

        {/* Stock */}
        <Grid item xs={12} md={4}>
          <TextField
            required
            fullWidth
            type="number"
            name="stock"
            label="Stock actual"
            value={formData.stock || ''}
            onChange={handleChange}
            error={!!errores.stock}
            helperText={errores.stock}
            InputProps={{
              endAdornment: <InputAdornment position="end">unidades</InputAdornment>,
              inputProps: { min: 0 }
            }}
            placeholder="0"
          />
        </Grid>

        {/* Stock Mínimo */}
        <Grid item xs={12} md={4}>
          <TextField
            required
            fullWidth
            type="number"
            name="stockMinimo"
            label="Stock mínimo"
            value={formData.stockMinimo || ''}
            onChange={handleChange}
            error={!!errores.stockMinimo}
            helperText={errores.stockMinimo || 'Cantidad mínima para alertas'}
            InputProps={{
              endAdornment: <InputAdornment position="end">unidades</InputAdornment>,
              inputProps: { min: 0 }
            }}
            placeholder="5"
          />
        </Grid>

        {/* Proveedor */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            name="proveedor"
            label="Proveedor"
            value={formData.proveedor || ''}
            onChange={handleChange}
            error={!!errores.proveedor}
            helperText={errores.proveedor}
            placeholder="Ej: Samsung Argentina"
          />
        </Grid>

        {/* Estado */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Estado</InputLabel>
            <Select
              name="estado"
              value={formData.estado || 'Activo'}
              label="Estado"
              onChange={handleChange}
            >
              {ESTADOS.map((estado) => (
                <MenuItem key={estado} value={estado}>
                  {estado}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Información calculada */}
        {formData.precio && formData.stock && (
          <Grid item xs={12}>
            <Box sx={{ 
              p: 2, 
              bgcolor: 'primary.light', 
              borderRadius: 1, 
              color: 'primary.contrastText' 
            }}>
              <Typography variant="subtitle1" gutterBottom>
                📊 Información calculada:
              </Typography>
              <Typography variant="body2">
                • Valor total del inventario: <strong>{formatearMoneda(valorEstimado())}</strong>
              </Typography>
              <Typography variant="body2">
                • Stock bajo: <strong>
                  {parseInt(formData.stock) <= parseInt(formData.stockMinimo) ? 'SÍ ⚠️' : 'NO ✅'}
                </strong>
              </Typography>
            </Box>
          </Grid>
        )}

        {/* Botón de envío */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={guardando || Object.keys(errores).length > 0}
              startIcon={iconoBotón}
              sx={{ minWidth: 150 }}
            >
              {guardando ? 'Guardando...' : textoBotón}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductoForm;