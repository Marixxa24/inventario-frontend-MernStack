import { useEffect, useCallback } from 'react';
import { useInventario } from '../context/InventarioContext';
import { productosAPI } from '../services/productosAPI';

// Hook personalizado para manejar productos
export const useProductos = () => {
  const {
    productos,
    productosStockBajo,
    totalProductos,
    paginaActual,
    loading,
    error,
    dispatch,
    ACTIONS,
    showAlert,
    setLoading,
    setError
  } = useInventario();

  // Cargar productos
  const cargarProductos = useCallback(async (pagina = 1, limite = 12) => {
    try {
      setLoading(true);
      const data = await productosAPI.obtenerProductos(pagina, limite);
      
      dispatch({
        type: ACTIONS.SET_PRODUCTOS,
        payload: {
          productos: data.productos,
          total: data.total
        }
      });
      
      dispatch({
        type: ACTIONS.SET_PAGINATION,
        payload: pagina
      });
      
      return data;
    } catch (error) {
      setError(error.message);
      showAlert(error.message, 'error');
      throw error;
    }
  }, [dispatch, ACTIONS, setLoading, setError, showAlert]);

  // Cargar productos con stock bajo
  const cargarProductosStockBajo = useCallback(async () => {
    try {
      setLoading(true);
      const data = await productosAPI.obtenerProductosStockBajo();
      
      dispatch({
        type: ACTIONS.SET_PRODUCTOS_STOCK_BAJO,
        payload: data.productos || data
      });
      
      return data;
    } catch (error) {
      setError(error.message);
      showAlert(error.message, 'error');
      throw error;
    }
  }, [dispatch, ACTIONS, setLoading, setError, showAlert]);

  // Obtener producto por ID
  const obtenerProducto = useCallback(async (id) => {
    try {
      setLoading(true);
      const producto = await productosAPI.obtenerProductoPorId(id);
      
      dispatch({
        type: ACTIONS.SET_PRODUCTO_SELECCIONADO,
        payload: producto
      });
      
      setLoading(false);
      return producto;
    } catch (error) {
      setError(error.message);
      showAlert(error.message, 'error');
      throw error;
    }
  }, [dispatch, ACTIONS, setLoading, setError, showAlert]);

  // Crear producto
  const crearProducto = useCallback(async (datosProducto) => {
    try {
      setLoading(true);
      const nuevoProducto = await productosAPI.crearProducto(datosProducto);
      
      dispatch({
        type: ACTIONS.ADD_PRODUCTO,
        payload: nuevoProducto
      });
      
      showAlert(`Producto "${nuevoProducto.nombre}" creado exitosamente`, 'success');
      return nuevoProducto;
    } catch (error) {
      setError(error.message);
      showAlert(error.message, 'error');
      throw error;
    }
  }, [dispatch, ACTIONS, setLoading, setError, showAlert]);

  // Actualizar producto
  const actualizarProducto = useCallback(async (id, datosProducto) => {
    try {
      setLoading(true);
      const productoActualizado = await productosAPI.actualizarProducto(id, datosProducto);
      
      dispatch({
        type: ACTIONS.UPDATE_PRODUCTO,
        payload: productoActualizado
      });
      
      showAlert(`Producto "${productoActualizado.nombre}" actualizado exitosamente`, 'success');
      return productoActualizado;
    } catch (error) {
      setError(error.message);
      showAlert(error.message, 'error');
      throw error;
    }
  }, [dispatch, ACTIONS, setLoading, setError, showAlert]);

  // Eliminar producto
  const eliminarProducto = useCallback(async (id) => {
    try {
      setLoading(true);
      await productosAPI.eliminarProducto(id);
      
      dispatch({
        type: ACTIONS.DELETE_PRODUCTO,
        payload: id
      });
      
      showAlert('Producto eliminado exitosamente', 'success');
      return true;
    } catch (error) {
      setError(error.message);
      showAlert(error.message, 'error');
      throw error;
    }
  }, [dispatch, ACTIONS, setLoading, setError, showAlert]);

  // Buscar productos
  const buscarProductos = useCallback(async (termino, categoria = '') => {
    try {
      setLoading(true);
      const data = await productosAPI.buscarProductos(termino, categoria);
      
      dispatch({
        type: ACTIONS.SET_PRODUCTOS,
        payload: {
          productos: data.productos,
          total: data.total
        }
      });
      
      return data;
    } catch (error) {
      setError(error.message);
      showAlert(error.message, 'error');
      throw error;
    }
  }, [dispatch, ACTIONS, setLoading, setError, showAlert]);

  // Actualizar solo el stock (cuando esté implementado en la API)
  const actualizarStock = useCallback(async (id, nuevoStock) => {
    try {
      setLoading(true);
      const productoActualizado = await productosAPI.actualizarStock(id, nuevoStock);
      
      dispatch({
        type: ACTIONS.UPDATE_PRODUCTO,
        payload: productoActualizado
      });
      
      showAlert('Stock actualizado exitosamente', 'success');
      return productoActualizado;
    } catch (error) {
      setError(error.message);
      showAlert(error.message, 'error');
      throw error;
    }
  }, [dispatch, ACTIONS, setLoading, setError, showAlert]);

  // Auto-cargar productos al usar el hook
  useEffect(() => {
    if (productos.length === 0) {
      cargarProductos();
    }
  }, [cargarProductos, productos.length]);

  return {
    // Estado
    productos,
    productosStockBajo,
    totalProductos,
    paginaActual,
    loading,
    error,
    
    // Acciones
    cargarProductos,
    cargarProductosStockBajo,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    buscarProductos,
    actualizarStock,
    
    // Helpers
    refrescar: () => cargarProductos(paginaActual),
    hayProductos: productos.length > 0,
    hayProductosStockBajo: productosStockBajo.length > 0,
  };
};

export default useProductos;