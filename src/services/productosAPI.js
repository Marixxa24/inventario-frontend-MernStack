// src/services/productosAPI.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en API:', error);
    
    if (error.response) {
      // Error del servidor (4xx, 5xx)
      throw new Error(error.response.data?.message || `Error ${error.response.status}: ${error.response.statusText}`);
    } else if (error.request) {
      // Error de red
      throw new Error('Error de conexión. Verifica que el servidor esté funcionando.');
    } else {
      // Error de configuración
      throw new Error('Error al procesar la solicitud');
    }
  }
);

// Constantes - EXPORTADAS PRIMERO
export const CATEGORIAS = [
  'Electrónicos',
  'Ropa y Accesorios',
  'Hogar y Jardín',
  'Deportes y Entretenimiento',
  'Salud y Belleza',
  'Automotriz',
  'Libros y Medios',
  'Juguetes y Juegos',
  'Alimentos y Bebidas',
  'Oficina y Negocios',
  'Mascotas',
  'Otros'
];

export const ESTADOS = [
  'Activo',
  'Inactivo',
  'Agotado',
  'Descontinuado'
];

// Objeto principal de la API
const productosAPI = {
  // Obtener todos los productos con paginación
  obtenerProductos: async (pagina = 1, limite = 10) => {
    try {
      const response = await api.get(`/productos?page=${pagina}&limit=${limite}`);
      
      // Mapear la estructura del backend a lo que espera el frontend
      return {
        productos: response.data.data || [],     // Los productos están en "data"
        total: response.data.total || 0,         // Total de productos
        pagina: response.data.page || 1,         // Página actual
        totalPaginas: response.data.pages || 1,  // Total de páginas
        count: response.data.count || 0          // Cantidad en la página actual
      };
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw error;
    }
  },

  // Obtener un producto por ID
  obtenerProducto: async (id) => {
    try {
      const response = await api.get(`/productos/${id}`);
      return response.data.data; // El producto individual también está en "data"
    } catch (error) {
      console.error('Error al obtener producto:', error);
      throw error;
    }
  },

  // Crear nuevo producto
  crearProducto: async (producto) => {
    try {
      const response = await api.post('/productos', producto);
      return response.data.data;
    } catch (error) {
      console.error('Error al crear producto:', error);
      throw error;
    }
  },

  // Actualizar producto
  actualizarProducto: async (id, producto) => {
    try {
      const response = await api.put(`/productos/${id}`, producto);
      return response.data.data;
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      throw error;
    }
  },

  // Eliminar producto
  eliminarProducto: async (id) => {
    try {
      const response = await api.delete(`/productos/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      throw error;
    }
  },

  // Buscar productos
  buscarProductos: async (termino, pagina = 1, limite = 10) => {
    try {
      const response = await api.get(`/productos/buscar?q=${encodeURIComponent(termino)}&page=${pagina}&limit=${limite}`);
      
      return {
        productos: response.data.data || [],
        total: response.data.total || 0,
        pagina: response.data.page || 1,
        totalPaginas: response.data.pages || 1,
        count: response.data.count || 0
      };
    } catch (error) {
      console.error('Error al buscar productos:', error);
      throw error;
    }
  },

  // Obtener productos por categoría
  obtenerProductosPorCategoria: async (categoria, pagina = 1, limite = 10) => {
    try {
      const response = await api.get(`/productos?categoria=${encodeURIComponent(categoria)}&page=${pagina}&limit=${limite}`);
      
      return {
        productos: response.data.data || [],
        total: response.data.total || 0,
        pagina: response.data.page || 1,
        totalPaginas: response.data.pages || 1,
        count: response.data.count || 0
      };
    } catch (error) {
      console.error('Error al obtener productos por categoría:', error);
      throw error;
    }
  },

  // Obtener estadísticas de productos
  obtenerEstadisticas: async () => {
    try {
      const response = await api.get('/productos/estadisticas');
      return response.data.data;
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      throw error;
    }
  }
};

// Exportaciones múltiples
export { productosAPI };
export default productosAPI;