import { useEffect, useState } from "react";
import { productosAPI } from "../services/productosAPI";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarProductos = async (paginaActual = 1) => {
    setLoading(true);
    setError(null);
    try {
      const { productos, totalPaginas } = await productosAPI.obtenerProductos(
        paginaActual,
        6
      );
      setProductos(productos);
      setTotalPaginas(totalPaginas);
      setPagina(paginaActual);
    } catch (err) {
      console.error("Error al cargar productos:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductos(1);
  }, []);

  const renderPaginacion = () => {
    const botones = [];
    for (let i = 1; i <= totalPaginas; i++) {
      botones.push(
        <button
          key={i}
          onClick={() => cargarProductos(i)}
          className={`px-3 py-1 mx-1 rounded transition ${
            i === pagina
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }
    return botones;
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#052659]">
        📦 Inventario de Productos
      </h2>

      {loading && <p className="text-center">Cargando productos...</p>}
      {error && <p className="text-red-500 text-center">Error: {error}</p>}

      {!loading && !error && productos.length === 0 && (
        <p className="text-center">No hay productos en el inventario.</p>
      )}

      {/* Grid de tarjetas */}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos.map((p) => (
          <li
            key={p._id}
            className="border rounded-xl shadow-md bg-white p-5 flex flex-col transition transform hover:scale-105 hover:shadow-lg"
          >
            <h3 className="text-xl font-semibold text-[#021024] mb-2">
              {p.nombre}
            </h3>
            <p className="text-gray-600 text-sm mb-3">{p.descripcion}</p>

            <div className="mb-3">
              <p className="text-green-600 font-bold text-lg">
                ${p.precio}
              </p>
              <p className="text-sm text-gray-500">Stock: {p.stock}</p>
              <p className="text-sm text-gray-500">Mínimo: {p.stockMinimo}</p>
              <p className="text-sm text-gray-500">Proveedor: {p.proveedor}</p>
              <p
                className={`text-sm font-semibold mt-1 ${
                  p.stockBajo ? "text-red-500" : "text-blue-600"
                }`}
              >
                {p.stockBajo ? "⚠️ Stock Bajo" : "✔️ Stock OK"}
              </p>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-2 mt-auto">
              <button className="flex-1 bg-[#548383] text-white py-2 rounded-lg hover:bg-[#052659] transition">
                Editar
              </button>
              <button className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Paginación */}
      <div className="flex justify-center mt-8">
        {renderPaginacion()}
      </div>
    </div>
  );
};

export default Productos;
