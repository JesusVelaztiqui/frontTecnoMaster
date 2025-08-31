import React, { useEffect, useState } from "react";
import { Search, Plus, Edit2, Trash2, X } from "lucide-react";
import Tooltips from "../Components/Tooltips";
import { sendData } from "../api/ApiData";
import {
  urlListarProductos,
  urlListarCategorias,
  urlListarMarcas,
  urlGuardarProductos,
  eliminarProductos,
} from "../api/UrlConfig";
import Modal from "../Components/Modal";
import EliminarModal from "../Components/TooltipsEliminar";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [tipoFiltro, setTipoFiltro] = useState("productos");
  const [marcas, setMarcas] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);
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
      } else {
        setTooltipData({
          type: "error",
          title: "Atención",
          message: response.mensaje,
        });
        setMostrarTooltip(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ejecutarEliminacion = async () => {
    try {
      const response = await sendData(
        eliminarProductos,
        "DELETE",
        null,
        productoAEliminar
      );
      if (response.status === 200) {
        await listarProductos();
        setTooltipData({
          type: "success",
          title: "Producto Eliminado",
          message: response.mensaje,
        });
        setMostrarTooltip(true);
      } else {
        setTooltipData({
          type: "error",
          title: "Atención",
          message: response.mensaje,
        });
        setMostrarTooltip(true);
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleEliminar = (producto) => {
    setProductoAEliminar(producto);
    setModalOpen(true);
  };

  const [busqueda, setBusqueda] = useState("");
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [mostrarTooltip, setMostrarTooltip] = useState(false);
  const [tooltipData, setTooltipData] = useState({
    type: "success",
    title: "",
    message: "",
  });

  const getDataToShow = () => {
    switch (tipoFiltro) {
      case "productos":
        return productos.filter(
          (producto) =>
            producto.descripcion
              .toLowerCase()
              .includes(busqueda.toLowerCase()) ||
            producto.descripcioncategoria
              ?.toLowerCase()
              .includes(busqueda.toLowerCase()) ||
            producto.descripcionmarca
              ?.toLowerCase()
              .includes(busqueda.toLowerCase())
        );
      case "categorias":
        return categorias.filter((categoria) =>
          categoria.descripcion.toLowerCase().includes(busqueda.toLowerCase())
        );
      case "marcas":
        return marcas.filter((marca) =>
          marca.descripcion.toLowerCase().includes(busqueda.toLowerCase())
        );
      case "sucursales":
        return [
          {
            id: 1,
            descripcion: "Sucursal Central",
            direccion: "Calle Principal 123",
            telefono: "021-123456",
            estado: true,
          },
          {
            id: 2,
            descripcion: "Sucursal Norte",
            direccion: "Av. Norte 456",
            telefono: "021-789012",
            estado: true,
          },
        ].filter((sucursal) =>
          sucursal.descripcion.toLowerCase().includes(busqueda.toLowerCase())
        );
      default:
        return [];
    }
  };

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

  const opcionesNuevo = [
    { id: "producto", label: "Producto", icon: "fas fa-truck-loading" },
    { id: "Marca", label: "Marca", icon: "fas fa-folder" },
    { id: "sucursal", label: "Sucursal", icon: "fas fa-building" },
    { id: "categoria", label: "Categoría", icon: "fas fa-folder" },
  ];

  useEffect(() => {
    listarProductos();
    listarCategorias();
    listarMarcas();
  }, []);

  const dataToShow = getDataToShow();

  return (
    <div className="productos-container">
      <div className="productos-header">
        <div className="filtros">
          <div className="filter-buttons">
            <button
              className={`filter-btn ${
                tipoFiltro === "productos" ? "active" : ""
              }`}
              onClick={() => setTipoFiltro("productos")}
            >
              Productos
            </button>
            <button
              className={`filter-btn ${
                tipoFiltro === "sucursales" ? "active" : ""
              }`}
              onClick={() => setTipoFiltro("sucursales")}
            >
              Sucursales
            </button>
            <button
              className={`filter-btn ${
                tipoFiltro === "marcas" ? "active" : ""
              }`}
              onClick={() => setTipoFiltro("marcas")}
            >
              Marcas
            </button>
            <button
              className={`filter-btn ${
                tipoFiltro === "categorias" ? "active" : ""
              }`}
              onClick={() => setTipoFiltro("categorias")}
            >
              Categorías
            </button>
          </div>
          <div className="buscador">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder={`Buscar ${tipoFiltro}...`}
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
              {tipoFiltro === "productos" && (
                <>
                  <th>Código</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Marca</th>
                  <th>Categoria</th>
                  <th>Stock</th>
                  <th></th>
                </>
              )}
              {tipoFiltro === "categorias" && (
                <>
                  <th>ID</th>
                  <th>Descripción</th>
                  <th>Estado</th>
                  <th></th>
                </>
              )}
              {tipoFiltro === "marcas" && (
                <>
                  <th>ID</th>
                  <th>Descripción</th>
                  <th>Estado</th>
                  <th></th>
                </>
              )}
              {tipoFiltro === "sucursales" && (
                <>
                  <th>ID</th>
                  <th>Descripción</th>
                  <th>Dirección</th>
                  <th>Teléfono</th>
                  <th>Estado</th>
                  <th></th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {tipoFiltro === "productos" &&
              dataToShow?.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.codigo}</td>
                  <td>{producto.descripcion}</td>
                  <td>{producto.precioventa?.toLocaleString("ES-es")}</td>
                  <td>{producto.descripcionmarca}</td>
                  <td>{producto.descripcioncategoria}</td>
                  <td>{producto.stock}</td>
                  <td className="acciones">
                    <button className="btn-editar">
                      <Edit2 size={16} />
                    </button>
                    <button
                      className="btn-eliminar"
                      onClick={() => handleEliminar(producto)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            {tipoFiltro === "categorias" &&
              dataToShow?.map((categoria) => (
                <tr key={categoria.id}>
                  <td>{categoria.id}</td>
                  <td>{categoria.descripcion}</td>
                  <td>{categoria.estado ? "Activo" : "Inactivo"}</td>
                  <td className="acciones">
                    <button className="btn-editar">
                      <Edit2 size={16} />
                    </button>
                    <button className="btn-eliminar">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            {tipoFiltro === "marcas" &&
              dataToShow?.map((marca) => (
                <tr key={marca.id}>
                  <td>{marca.id}</td>
                  <td>{marca.descripcion}</td>
                  <td>{marca.estado ? "Activo" : "Inactivo"}</td>
                  <td className="acciones">
                    <button className="btn-editar">
                      <Edit2 size={16} />
                    </button>
                    <button className="btn-eliminar">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            {tipoFiltro === "sucursales" &&
              dataToShow?.map((sucursal) => (
                <tr key={sucursal.id}>
                  <td>{sucursal.id}</td>
                  <td>{sucursal.descripcion}</td>
                  <td>{sucursal.direccion}</td>
                  <td>{sucursal.telefono}</td>
                  <td>{sucursal.estado ? "Activo" : "Inactivo"}</td>
                  <td className="acciones">
                    <button className="btn-editar">
                      <Edit2 size={16} />
                    </button>
                    <button className="btn-eliminar">
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
      <EliminarModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onEliminar={ejecutarEliminacion}
        titulo="Confirmar eliminación"
        descripcion="¿Estás seguro de que quieres eliminar este producto? Esta acción no se puede deshacer."
      />
    </div>
  );
};

export default Productos;
