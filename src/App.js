import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { InventarioProvider } from './context/InventarioContext';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import Productos from './pages/Productos';
import AgregarProducto from './pages/AgregarProducto';
import NotFound from './pages/NotFound';


// Tema Material UI
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <InventarioProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos/>} />
            <Route path="/productos/nuevo" element={<AgregarProducto/>} />
            <Route path="/productos/editar/:id" element={<div>Editar Producto - En desarrollo</div>} />
            <Route path="/stock-bajo" element={<div>Stock Bajo - En desarrollo</div>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </InventarioProvider>
    </ThemeProvider>
  );
}

export default App;