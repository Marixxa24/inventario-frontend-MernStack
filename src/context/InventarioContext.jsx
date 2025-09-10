import React, { createContext, useContext, useReducer } from 'react';

// Estado inicial
const initialState = {
  productos: [],
  productosStockBajo: [],
  loading: false,
  error: null,
  alert: null,
  totalProductos: 0,
  paginaActual: 1,
  productoSeleccionado: null,
};

// Tipos de acciones
export const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_PRODUCTOS: 'SET_PRODUCTOS',
  SET_PRODUCTOS_STOCK_BAJO: 'SET_PRODUCTOS_STOCK_BAJO',
  ADD_PRODUCTO: 'ADD_PRODUCTO',
  UPDATE_PRODUCTO: 'UPDATE_PRODUCTO',
  DELETE_PRODUCTO: 'DELETE_PRODUCTO',
  SET_ERROR: 'SET_ERROR',
  SET_ALERT: 'SET_ALERT',
  CLEAR_ALERT: 'CLEAR_ALERT',
  SET_PRODUCTO_SELECCIONADO: 'SET_PRODUCTO_SELECCIONADO',
  SET_PAGINATION: 'SET_PAGINATION',
};

// Reducer
const inventarioReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload, error: null };

    case ACTIONS.SET_PRODUCTOS:
      return {
        ...state,
        productos: Array.isArray(action.payload) ? action.payload : [], // aseguramos que siempre sea array
        totalProductos: Array.isArray(action.payload) ? action.payload.length : 0,
        loading: false,
        error: null,
      };

    case ACTIONS.SET_PRODUCTOS_STOCK_BAJO:
      return {
        ...state,
        productosStockBajo: Array.isArray(action.payload) ? action.payload : [],
        loading: false,
        error: null,
      };

    case ACTIONS.ADD_PRODUCTO:
      return {
        ...state,
        productos: [...state.productos, action.payload],
        totalProductos: state.totalProductos + 1,
        loading: false,
      };

    case ACTIONS.UPDATE_PRODUCTO:
      return {
        ...state,
        productos: state.productos.map(p =>
          p._id === action.payload._id ? action.payload : p
        ),
        productoSeleccionado: action.payload,
        loading: false,
      };

    case ACTIONS.DELETE_PRODUCTO:
      return {
        ...state,
        productos: state.productos.filter(p => p._id !== action.payload),
        totalProductos: state.totalProductos - 1,
        loading: false,
      };

    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };

    case ACTIONS.SET_ALERT:
      return { ...state, alert: action.payload };

    case ACTIONS.CLEAR_ALERT:
      return { ...state, alert: null };

    case ACTIONS.SET_PRODUCTO_SELECCIONADO:
      return { ...state, productoSeleccionado: action.payload };

    case ACTIONS.SET_PAGINATION:
      return { ...state, paginaActual: action.payload };

    default:
      return state;
  }
};

// Context
const InventarioContext = createContext();

// Provider
export const InventarioProvider = ({ children }) => {
  const [state, dispatch] = useReducer(inventarioReducer, initialState);

  // Actions helpers
  const showAlert = (message, type = 'success') => {
    dispatch({
      type: ACTIONS.SET_ALERT,
      payload: { message, type }
    });
    
    setTimeout(() => {
      dispatch({ type: ACTIONS.CLEAR_ALERT });
    }, 5000);
  };

  const clearAlert = () => {
    dispatch({ type: ACTIONS.CLEAR_ALERT });
  };

  const setLoading = (loading) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: loading });
  };

  const setError = (error) => {
    dispatch({ type: ACTIONS.SET_ERROR, payload: error });
  };

  const value = {
    ...state,
    dispatch,
    showAlert,
    clearAlert,
    setLoading,
    setError,
    ACTIONS,
  };

  return (
    <InventarioContext.Provider value={value}>
      {children}
    </InventarioContext.Provider>
  );
};

// Hook personalizado
export const useInventario = () => {
  const context = useContext(InventarioContext);
  if (!context) {
    throw new Error('useInventario debe usarse dentro de InventarioProvider');
  }
  return context;
};

export default InventarioContext;
