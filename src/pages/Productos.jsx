import React, { useState } from "react";
import { Search, Plus, Edit2, Trash2, X } from "lucide-react";
import Tooltips from "../Components/Tooltips";

const Productos = () => {
  const [productos, setProductos] = useState([
    {
      id: 1,
      nombre: "Laptop HP",
      categoria: "Electrónicos",
      precio: 25000,
      stock: 15,
    },
    {
      id: 2,
      nombre: "Mouse Logitech",
      categoria: "Accesorios",
      precio: 1200,
      stock: 50,
    },
    {
      id: 3,
      nombre: "Teclado Mecánico",
      categoria: "Accesorios",
      precio: 3500,
      stock: 30,
    },
    {
      id: 4,
      nombre: "Monitor 24''",
      categoria: "Electrónicos",
      precio: 18000,
      stock: 8,
    },
    {
      id: 5,
      nombre: "Webcam HD",
      categoria: "Accesorios",
      precio: 2800,
      stock: 25,
    },
    {
      id: 6,
      nombre: "Laptop HP",
      categoria: "Electrónicos",
      precio: 25000,
      stock: 15,
    },
    {
      id: 7,
      nombre: "Mouse Logitech",
      categoria: "Accesorios",
      precio: 1200,
      stock: 50,
    },
    {
      id: 8,
      nombre: "Teclado Mecánico",
      categoria: "Accesorios",
      precio: 3500,
      stock: 30,
    },
    {
      id: 9,
      nombre: "Monitor 24''",
      categoria: "Electrónicos",
      precio: 18000,
      stock: 8,
    },
    {
      id: 10,
      nombre: "Webcam HD",
      categoria: "Accesorios",
      precio: 2800,
      stock: 25,
    },
  ]);

  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [mostrarTooltip, setMostrarTooltip] = useState(false);
  const [tooltipData, setTooltipData] = useState({
    type: "success",
    title: "",
    message: "",
  });
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    categoria: "",
    precio: "",
    stock: "",
  });

  const categorias = [...new Set(productos.map((p) => p.categoria))];

  const productosFiltrados = productos.filter((producto) => {
    const coincideBusqueda = producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    const coincideCategoria =
      filtroCategoria === "" || producto.categoria === filtroCategoria;
    return coincideBusqueda && coincideCategoria;
  });

  const handleAgregarProducto = () => {
    if (
      nuevoProducto.nombre &&
      nuevoProducto.categoria &&
      nuevoProducto.precio &&
      nuevoProducto.stock
    ) {
      const producto = {
        id: Date.now(),
        nombre: nuevoProducto.nombre,
        categoria: nuevoProducto.categoria,
        precio: parseFloat(nuevoProducto.precio),
        stock: parseInt(nuevoProducto.stock),
      };
      setProductos([...productos, producto]);
      setNuevoProducto({ nombre: "", categoria: "", precio: "", stock: "" });
      setModalAbierto(false);

      setTooltipData({
        type: "success",
        title: "¡Producto agregado!",
        message: `${producto.nombre} se agregó correctamente al inventario`,
      });
      setMostrarTooltip(true);
    }
  };

  const handleEliminar = (id) => {
    const productoEliminado = productos.find((p) => p.id === id);
    setProductos(productos.filter((p) => p.id !== id));

    setTooltipData({
      type: "warning",
      title: "Producto eliminado",
      message: `${productoEliminado.nombre} fue eliminado del inventario`,
    });
    setMostrarTooltip(true);
  };

  const opcionesNuevo = [
    { id: "producto", label: "Producto", icon: "fas fa-truck-loading" },
    { id: "sucursal", label: "Sucursal", icon: "fas fa-building" },
    { id: "categoria", label: "Categoría", icon: "fas fa-folder" },
  ];

  return (
    <div className="productos-container">
      <div className="productos-header">
        <div className="filtros">
          <div className="buscador">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="search-input"
            />
          </div>

          <select
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
            className="filtro-select"
          >
            <option value="">Todas las categorías</option>
            {categorias.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>

        <div className="tooltip-container">
          <button
            onClick={() => setTooltipVisible(!tooltipVisible)}
            className="btn-agregar"
          >
            <Plus size={20} />
            Nuevo
          </button>

          {tooltipVisible && (
            <div className="tooltip-menu">
              {opcionesNuevo.map((opcion) => (
                <button
                  key={opcion.id}
                  onClick={() => {
                    if (opcion.id === "producto") {
                      setModalAbierto(true);
                    }
                    setTooltipVisible(false);
                  }}
                  className="tooltip-option"
                >
                  <i className={opcion.icon}></i>
                  {opcion.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="tabla-container">
        <table className="productos-tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>{producto.categoria}</td>
                <td>{producto.precio.toLocaleString()}</td>
                <td>{producto.stock}</td>
                <td className="acciones">
                  <button className="btn-editar">
                    <Edit2 size={16} />
                  </button>
                  <button
                    className="btn-eliminar"
                    onClick={() => handleEliminar(producto.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalAbierto && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Agregar Nuevo Producto</h3>
              <button
                onClick={() => setModalAbierto(false)}
                className="btn-cerrar"
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                placeholder="Nombre del producto"
                value={nuevoProducto.nombre}
                onChange={(e) =>
                  setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })
                }
                className="modal-input"
              />

              <input
                type="text"
                placeholder="Categoría"
                value={nuevoProducto.categoria}
                onChange={(e) =>
                  setNuevoProducto({
                    ...nuevoProducto,
                    categoria: e.target.value,
                  })
                }
                className="modal-input"
              />

              <input
                type="number"
                placeholder="Precio"
                value={nuevoProducto.precio}
                onChange={(e) =>
                  setNuevoProducto({ ...nuevoProducto, precio: e.target.value })
                }
                className="modal-input"
              />

              <input
                type="number"
                placeholder="Stock"
                value={nuevoProducto.stock}
                onChange={(e) =>
                  setNuevoProducto({ ...nuevoProducto, stock: e.target.value })
                }
                className="modal-input"
              />
            </div>

            <div className="modal-footer">
              <button
                onClick={() => setModalAbierto(false)}
                className="btn-cancelar"
              >
                Cancelar
              </button>
              <button onClick={handleAgregarProducto} className="btn-guardar">
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      <Tooltips
        type={tooltipData.type}
        title={tooltipData.title}
        message={tooltipData.message}
        isVisible={mostrarTooltip}
        onClose={() => setMostrarTooltip(false)}
        duration={5000}
      />
    </div>
  );
};

export default Productos;
