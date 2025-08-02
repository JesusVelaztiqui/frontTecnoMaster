import React, { useEffect, useState } from "react";
import { Search, Plus, Edit2, Trash2, X } from "lucide-react";
import Tooltips from "../Components/Tooltips";
import { sendData } from "../api/ApiData";
import {
  urlListarProductos,
  urlListarCategorias,
  urlListarMarcas,
  urlGuardarProductos,
} from "../api/UrlConfig";
import Modal from "../Components/Modal";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [productModel, setProductModel] = useState({
    idmarca: 1,
    stock: 1,
    tipoimpuesto: "",
    porcentajeimpuesto: 0,
    descripcion: "",
    preciocompra: 0,
    precioventa: 0,
    tipoproducto: "",
    idcategoria: 1,
    codigo: "",
    estado: false,
  });
  const listarProductos = async () => {
    try {
      const response = await sendData(urlListarProductos, "GET", null, null);
      if (response.status === 200) {
        setProductos(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const listarCategorias = async () => {
    try {
      const response = await sendData(urlListarCategorias, "GET", null, null);
      if (response.status === 200) {
        setCategorias(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const listarMarcas = async () => {
    try {
      const response = await sendData(urlListarMarcas, "GET", null, null);
      if (response.status === 200) {
        setMarcas(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const grabarProductos = async () => {
    try {
      const response = await sendData(
        urlGuardarProductos,
        "POST",
        null,
        productModel
      );
      if (response.status === 200) {
        await listarProductos();
        setModalAbierto(false);
        setTooltipData({
          type: "success",
          title: "Producto Grabado",
          message: response.mensaje,
        });
        setMostrarTooltip(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [busqueda, setBusqueda] = useState("");
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [mostrarTooltip, setMostrarTooltip] = useState(false);
  const [tooltipData, setTooltipData] = useState({
    type: "success",
    title: "",
    message: "",
  });

  const productosFiltrados = productos.filter((producto) => {
    const coincideBusqueda =
      producto.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
      producto.descripcioncategoria
        .toLowerCase()
        .includes(busqueda.toLowerCase()) ||
      producto.descripcionmarca.toLowerCase().includes(busqueda.toLowerCase());
    return coincideBusqueda;
  });

  const handleAgregarProducto = (event) => {
    const { name, value } = event.target;

    const camposNumericos = [
      "stock",
      "porcentajeimpuesto",
      "preciocompra",
      "precioventa",
      "idmarca",
      "idcategoria",
    ];

    let parsedValue = value;

    if (camposNumericos.includes(name)) {
      parsedValue = Number(value);
    } else if (name === "estado") {
      parsedValue = value === "true";
    }

    setProductModel((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
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

  useEffect(() => {
    listarProductos();
    listarCategorias();
    listarMarcas();
  }, []);

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
              <th>Código</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Marca</th>
              <th>Categoria</th>
              <th>Stock</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados?.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.codigo}</td>
                <td>{producto.descripcion}</td>
                <td>{producto.precioventa.toLocaleString("ES-es")}</td>
                <td>{producto.descripcionmarca}</td>
                <td>{producto.descripcioncategoria}</td>
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

      <Modal visible={modalAbierto} whith={55}>
        <div className="modal-header">
          <h3>Agregar Nuevo Producto</h3>
          <button className="btn-cerrar" onClick={() => setModalAbierto(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Descripción"
            className="modal-input"
            name="descripcion"
            onChange={handleAgregarProducto}
          />

          <select
            className="modal-input"
            onChange={handleAgregarProducto}
            name="idcategoria"
          >
            <option value="">Seleccione categoría</option>
            {categorias?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.descripcion}
              </option>
            ))}
          </select>

          <select
            className="modal-input"
            onChange={handleAgregarProducto}
            name="idmarca"
          >
            <option value="">Seleccione marca</option>
            {marcas?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.descripcion}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Código"
            className="modal-input"
            name="codigo"
            onChange={handleAgregarProducto}
          />

          <input
            type="number"
            placeholder="Stock"
            className="modal-input"
            name="stock"
            onChange={handleAgregarProducto}
          />

          <select
            className="modal-input"
            name="tipoimpuesto"
            onChange={handleAgregarProducto}
          >
            <option value="">Tipo de impuesto</option>
            <option value="IVA">IVA</option>
            <option value="EXENTO">Exento</option>
          </select>

          <input
            type="number"
            placeholder="Porcentaje de impuesto"
            className="modal-input"
            name="porcentajeimpuesto"
            onChange={handleAgregarProducto}
          />

          <input
            type="number"
            placeholder="Precio de compra"
            className="modal-input"
            name="preciocompra"
            onChange={handleAgregarProducto}
          />

          <input
            type="number"
            placeholder="Precio de venta"
            className="modal-input"
            name="precioventa"
            onChange={handleAgregarProducto}
          />

          <input
            type="text"
            placeholder="Tipo de producto"
            className="modal-input"
            name="tipoproducto"
            onChange={handleAgregarProducto}
          />

          <select
            className="modal-input"
            name="estado"
            onChange={handleAgregarProducto}
          >
            <option value="">Estado</option>
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>
        </div>

        <div className="modal-footer">
          <button
            className="btn-guardar"
            onClick={async () => await grabarProductos()}
          >
            Guardar Producto
          </button>
        </div>
      </Modal>
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
