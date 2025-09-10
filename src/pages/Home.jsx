import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Chip,
  Button
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
  Inventory as InventoryIcon,
  Warning as WarningIcon,
  AttachMoney as MoneyIcon,
  TrendingUp as TrendingUpIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { useInventario } from '../context/InventarioContext';

const Home = () => {
  const { productos, totalProductos } = useInventario();

  const calcularEstadisticas = () => {
    if (!productos.length) return {
      valorTotal: 0,
      categorias: {},
      stockBajo: 0
    };

    const valorTotal = productos.reduce((total, producto) =>
      total + (producto.valorInventario || 0), 0
    );

    const categorias = productos.reduce((acc, producto) => {
      acc[producto.categoria] = (acc[producto.categoria] || 0) + 1;
      return acc;
    }, {});

    const stockBajo = productos.filter(p => p.stockBajo).length;

    return { valorTotal, categorias, stockBajo };
  };

  const { valorTotal, categorias, stockBajo } = calcularEstadisticas();

  const formatearMoneda = (valor) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(valor);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, color: "#021024" }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ color: "#052659" }}>
          SdI
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#548383" }}>
          continua en desarrollo
        </Typography>
      </Box>

      {/* Estadísticas principales */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { icon: <InventoryIcon />, label: "Total de Productos", value: totalProductos },
          { icon: <MoneyIcon />, label: "Valor Total de Inventario", value: formatearMoneda(valorTotal) },
          { icon: <WarningIcon />, label: "Stock Bajo", value: stockBajo, iconColor: stockBajo > 0 ? "#F44336" : "#4CAF50" },
          { icon: <TrendingUpIcon />, label: "Categorías", value: Object.keys(categorias).length }
        ].map((item, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card
              elevation={3}
              sx={{
                bgcolor: "#C1E8FF",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 6
                }
              }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                {React.cloneElement(item.icon, {
                  sx: { fontSize: 40, color: item.iconColor || "#052659", mb: 1 }
                })}
                <Typography variant="h4" component="div">{item.value}</Typography>
                <Typography sx={{ color: "#548383" }}>{item.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Categorías */}
      {Object.keys(categorias).length > 0 && (
        <Card
          elevation={3}
          sx={{
            mb: 4,
            bgcolor: "#C1E8FF",
            transition: "all 0.3s ease",
            "&:hover": { boxShadow: 6 }
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ color: "#052659" }}>
              Productos por Categoría
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {Object.entries(categorias).map(([categoria, cantidad]) => (
                <Chip
                  key={categoria}
                  label={`${categoria}: ${cantidad}`}
                  variant="outlined"
                  sx={{
                    borderColor: "#052659",
                    color: "#052659",
                    fontWeight: "bold",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "#7DA0CA",
                      color: "white",
                      transform: "scale(1.1)"
                    }
                  }}
                />
              ))}
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Acciones rápidas */}
      <Card elevation={3} sx={{ bgcolor: "#C1E8FF", transition: "all 0.3s ease", "&:hover": { boxShadow: 6 } }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ color: "#052659" }}>
            Acciones Rápidas
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                component={Link}
                to="/productos/nuevo"
                variant="contained"
                fullWidth
                startIcon={<AddIcon />}
                size="large"
                sx={{
                  bgcolor: "#052659",
                  transition: "all 0.3s ease",
                  "&:hover": { bgcolor: "#021024", transform: "scale(1.05)" }
                }}
              >
                Agregar Producto
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                component={Link}
                to="./productos"
                variant="outlined"
                fullWidth
                startIcon={<InventoryIcon />}
                size="large"
                sx={{
                  borderColor: "#052659",
                  color: "#052659",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "#021024",
                    color: "#021024",
                    transform: "scale(1.05)"
                  }
                }}
              >
                Ver Productos
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                component={Link}
                to="/stock-bajo"
                variant="outlined"
                fullWidth
                startIcon={<WarningIcon />}
                size="large"
                sx={{
                  borderColor: "#F44336",
                  color: "#F44336",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "#B71C1C",
                    color: "#B71C1C",
                    transform: "scale(1.05)"
                  }
                }}
              >
                Stock Bajo
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Mensaje de bienvenida si no hay productos */}
      {totalProductos === 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h5" sx={{ color: "#052659" }} gutterBottom>
            ¡Bienvenido a tu sistema de inventario!
          </Typography>
          <Typography variant="body1" sx={{ color: "#548383", mb: 2 }}>
            Comienza agregando tu primer producto para empezar a gestionar tu inventario.
          </Typography>
          <Button
            component={Link}
            to="/productos/nuevo"
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            sx={{
              bgcolor: "#052659",
              transition: "all 0.3s ease",
              "&:hover": { bgcolor: "#021024", transform: "scale(1.05)" }
            }}
          >
            Agregar Primer Producto
             continua en desarrollo
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Home;
