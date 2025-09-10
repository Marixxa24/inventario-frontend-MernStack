// Constantes de la aplicación

// Configuración de la API
export const API_CONFIG = {
  BASE_URL: 'http://localhost:3001/api',
  TIMEOUT: 10000, // 10 segundos
  ITEMS_PER_PAGE: 12,
};

// Categorías disponibles (debe coincidir con la API)
export const CATEGORIAS = [
  'Electrónicos',
  'Ropa',
  'Hogar',
  'Deportes',
  'Libros',
  'Otros'
];

// Estados de productos
export const ESTADOS = [
  'Activo',
  'Inactivo',
  'Descontinuado'
];

// Colores para categorías
export const COLORES_CATEGORIAS = {
  'Electrónicos': 'primary',
  'Ropa': 'secondary',
  'Hogar': 'success',
  'Deportes': 'warning',
  'Libros': 'info',
  'Otros': 'default'
};

// Tipos de alertas
export const TIPOS_ALERTA = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// Mensajes predefinidos
export const MENSAJES = {
  CARGANDO: 'Cargando...',
  GUARDANDO: 'Guardando...',
  ELIMINANDO: 'Eliminando...',
  ERROR_CONEXION: 'Error de conexión con el servidor',
  ERROR_GENERICO: 'Ha ocurrido un error inesperado',
  SIN_PRODUCTOS: 'No hay productos registrados',
  SIN_RESULTADOS: 'No se encontraron resultados',
  PRODUCTO_CREADO: 'Producto creado exitosamente',
  PRODUCTO_ACTUALIZADO: 'Producto actualizado exitosamente',
  PRODUCTO_ELIMINADO: 'Producto eliminado exitosamente',
  CONFIRMACION_ELIMINAR: '¿Estás seguro de que quieres eliminar este producto?'
};

// Validaciones
export const VALIDACIONES = {
  NOMBRE_MIN_LENGTH: 2,
  NOMBRE_MAX_LENGTH: 100,
  DESCRIPCION_MIN_LENGTH: 10,
  DESCRIPCION_MAX_LENGTH: 500,
  PRECIO_MIN: 0,
  STOCK_MIN: 0,
  PROVEEDOR_MIN_LENGTH: 2,
  PROVEEDOR_MAX_LENGTH: 100
};

// Funciones de utilidad

/**
 * Formatea un valor como moneda argentina
 * @param {number} valor - Valor a formatear
 * @returns {string} Valor formateado como moneda
 */
export const formatearMoneda = (valor) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(valor || 0);
};

/**
 * Formatea una fecha en formato local argentino
 * @param {string|Date} fecha - Fecha a formatear
 * @returns {string} Fecha formateada
 */
export const formatearFecha = (fecha) => {
  if (!fecha) return 'N/A';
  return new Date(fecha).toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Formatea una fecha con hora
 * @param {string|Date} fecha - Fecha a formatear
 * @returns {string} Fecha y hora formateadas
 */
export const formatearFechaHora = (fecha) => {
  if (!fecha) return 'N/A';
  return new Date(fecha).toLocaleString('es-AR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Obtiene el color apropiado para una categoría
 * @param {string} categoria - Categoría del producto
 * @returns {string} Color de Material UI
 */
export const obtenerColorCategoria = (categoria) => {
  return COLORES_CATEGORIAS[categoria] || 'default';
};

/**
 * Determina el color del stock según el nivel
 * @param {number} stock - Stock actual
 * @param {number} stockMinimo - Stock mínimo
 * @param {boolean} stockBajo - Flag de stock bajo
 * @returns {string} Color de Material UI
 */
export const obtenerColorStock = (stock, stockMinimo, stockBajo) => {
  if (stockBajo) return 'error';
  if (stock <= stockMinimo * 1.5) return 'warning';
  return 'success';
};

/**
 * Valida un email
 * @param {string} email - Email a validar
 * @returns {boolean} True si es válido
 */
export const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Valida un número
 * @param {any} valor - Valor a validar
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @returns {boolean} True si es válido
 */
export const validarNumero = (valor, min = 0, max = Infinity) => {
  const num = parseFloat(valor);
  return !isNaN(num) && num >= min && num <= max;
};

/**
 * Capitaliza la primera letra de un string
 * @param {string} str - String a capitalizar
 * @returns {string} String capitalizado
 */
export const capitalizar = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Trunca un texto a una longitud específica
 * @param {string} texto - Texto a truncar
 * @param {number} longitud - Longitud máxima
 * @returns {string} Texto truncado
 */
export const truncarTexto = (texto, longitud = 50) => {
  if (!texto) return '';
  if (texto.length <= longitud) return texto;
  return texto.substring(0, longitud) + '...';
};

/**
 * Debounce para optimizar búsquedas
 * @param {Function} func - Función a ejecutar
 * @param {number} delay - Delay en ms
 * @returns {Function} Función con debounce
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

/**
 * Genera un ID único simple
 * @returns {string} ID único
 */
export const generarId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const constants = {
  API_CONFIG,
  CATEGORIAS,
  ESTADOS,
  COLORES_CATEGORIAS,
  TIPOS_ALERTA,
  MENSAJES,
  VALIDACIONES,
  formatearMoneda,
  formatearFecha,
  formatearFechaHora,
  obtenerColorCategoria,
  obtenerColorStock,
  validarEmail,
  validarNumero,
  capitalizar,
  truncarTexto,
  debounce,
  generarId
};

export default constants;