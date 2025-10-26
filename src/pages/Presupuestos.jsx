import React, { useEffect, useState } from "react";
import { Search, Plus, Edit2, Trash2, X, Eye } from "lucide-react";
import Tooltips from "../Components/Tooltips";
import Modal from "../Components/Modal";
import EliminarModal from "../Components/TooltipsEliminar";

const Presupuestos = () => {
  const [presupuestos, setPresupuestos] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalPedidoAbierto, setModalPedidoAbierto] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [presupuestoAEliminar, setPresupuestoAEliminar] = useState(null);
  const [presupuestoModel, setPresupuestoModel] = useState({
    fecha: new Date().toISOString().split('T')[0],
    fechaValidez: '',
    sucursal: '',
    proveedor: '',
    ruc: '',
    nroPedido: '',
    observacion: '',
    estado: 'pendiente'
  });

  // Estados para tooltips
  const [busqueda, setBusqueda] = useState("");
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [mostrarTooltip, setMostrarTooltip] = useState(false);
  const [tooltipData, setTooltipData] = useState({
    type: "success",
    title: "",
    message: "",
  });

  // Datos de ejemplo (simulando API)
  const presupuestosData = [
    {
      id: 1,
      codigo: 'PRES-001',
      fecha: '25/09/2025',
      fechaValidez: '25/10/2025',
      sucursal: 'Sucursal Central',
      proveedor: 'Distribuidora San Miguel',
      ruc: '80.123.456-7',
      nroPedido: 'PED-001',
      total: 2500000,
      observacion: 'Presupuesto con descuento por volumen del 10%',
      estado: 'pendiente'
    },
    {
      id: 2,
      codigo: 'PRES-002',
      fecha: '24/09/2025',
      fechaValidez: '24/10/2025',
      sucursal: 'Sucursal Norte',
      proveedor: 'Comercial López S.A.',
      ruc: '80.234.567-8',
      nroPedido: 'PED-002',
      total: 1800000,
      observacion: 'Presupuesto para pedido mensual regular',
      estado: 'realizado'
    },
    {
      id: 3,
      codigo: 'PRES-003',
      fecha: '23/09/2025',
      fechaValidez: '23/11/2025',
      sucursal: 'Sucursal Sur',
      proveedor: 'Importadora Central',
      ruc: '80.345.678-9',
      nroPedido: '-',
      total: 3200000,
      observacion: 'Presupuesto para productos importados, requiere confirmación de stock',
      estado: 'pendiente'
    },
    {
      id: 4,
      codigo: 'PRES-004',
      fecha: '22/09/2025',
      fechaValidez: '22/10/2025',
      sucursal: 'Sucursal Este',
      proveedor: 'Mayorista del Este',
      ruc: '80.456.789-0',
      nroPedido: 'PED-004',
      total: 950000,
      observacion: 'Cliente solicita modificaciones en especificaciones',
      estado: 'cancelado'
    },
    {
      id: 5,
      codigo: 'PRES-005',
      fecha: '21/09/2025',
      fechaValidez: '21/11/2025',
      sucursal: 'Sucursal Oeste',
      proveedor: 'Proveedora Nacional',
      ruc: '80.567.890-1',
      nroPedido: 'PED-005',
      total: 4100000,
      observacion: 'Presupuesto de emergencia, requiere aprobación urgente',
      estado: 'realizado'
    },
    {
      id: 6,
      codigo: 'PRES-006',
      fecha: '20/09/2025',
      fechaValidez: '20/12/2025',
      sucursal: 'Sucursal Central',
      proveedor: 'Distribuidora Regional',
      ruc: '80.678.901-2',
      nroPedido: '-',
      total: 1650000,
      observacion: 'Presupuesto trimestral con condiciones especiales de pago',
      estado: 'pendiente'
    }
  ];

  // Simulación de funciones API (para cuando implementes el backend)
  const listarPresupuestos = async () => {
    try {
      // Simulamos una respuesta de API
      setPresupuestos(presupuestosData);
    } catch (error) {
      console.log(error);
    }
  };

  const grabarPresupuesto = async () => {
    try {
      // Simulamos guardado
      console.log('Guardando presupuesto:', presupuestoModel);
      await listarPresupuestos();
      setModalAbierto(false);
      setModalPedidoAbierto(false);
      setTooltipData({
        type: "success",
        title: "Presupuesto Creado",
        message: "El presupuesto se ha creado exitosamente",
      });
      setMostrarTooltip(true);
      // Resetear formulario
      setPresupuestoModel({
        fecha: new Date().toISOString().split('T')[0],
        fechaValidez: '',
        sucursal: '',
        proveedor: '',
        ruc: '',
        nroPedido: '',
        observacion: '',
        estado: 'pendiente'
      });
    } catch (error) {
      console.log(error);
      setTooltipData({
        type: "error",
        title: "Error",
        message: "Error al crear el presupuesto",
      });
      setMostrarTooltip(true);
    }
  };

  const ejecutarEliminacion = async () => {
    try {
      console.log('Eliminando presupuesto:', presupuestoAEliminar);
      await listarPresupuestos();
      setTooltipData({
        type: "success",
        title: "Presupuesto Eliminado",
        message: "El presupuesto se ha eliminado exitosamente",
      });
      setMostrarTooltip(true);
    } catch (error) {
      setTooltipData({
        type: "error",
        title: "Error",
        message: "Error al eliminar el presupuesto",
      });
      setMostrarTooltip(true);
    }
  };

  const handleEliminar = (presupuesto) => {
    setPresupuestoAEliminar(presupuesto);
    setModalOpen(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPresupuestoModel(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const opcionesNuevo = [
    { id: "presupuesto", label: "Nuevo Presupuesto", icon: "fas fa-file-alt" },
    { id: "presupuesto-pedido", label: "Presupuesto desde Pedido", icon: "fas fa-shopping-cart" },
    { id: "importar", label: "Importar Presupuestos", icon: "fas fa-file-import" },
    { id: "exportar", label: "Exportar Presupuestos", icon: "fas fa-file-export" }
  ];

  const handleOpcionClick = (opcionId) => {
    switch(opcionId) {
      case 'presupuesto':
        setModalAbierto(true);
        break;
      case 'presupuesto-pedido':
        setModalPedidoAbierto(true);
        break;
      case 'importar':
        setTooltipData({
          type: "info",
          title: "Función no disponible",
          message: "Importar presupuestos - Por implementar",
        });
        setMostrarTooltip(true);
        break;
      case 'exportar':
        setTooltipData({
          type: "info",
          title: "Función no disponible",
          message: "Exportar presupuestos - Por implementar",
        });
        setMostrarTooltip(true);
        break;
    }
    setTooltipVisible(false);
  };

  // Filtrado de presupuestos
  const presupuestosFiltrados = presupuestos.filter(presupuesto =>
    presupuesto.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
    presupuesto.proveedor.toLowerCase().includes(busqueda.toLowerCase()) ||
    presupuesto.sucursal.toLowerCase().includes(busqueda.toLowerCase()) ||
    presupuesto.ruc.toLowerCase().includes(busqueda.toLowerCase())
  );

  const getEstadoClass = (estado) => {
    switch(estado) {
      case 'pendiente': return 'estado pendiente';
      case 'realizado': return 'estado aprobado';
      case 'cancelado': return 'estado rechazado';
      default: return 'estado';
    }
  };

  const getEstadoIcon = (estado) => {
    switch(estado) {
      case 'pendiente': return 'fas fa-clock';
      case 'realizado': return 'fas fa-check';
      case 'cancelado': return 'fas fa-times';
      default: return 'fas fa-question';
    }
  };

  const getEstadoText = (estado) => {
    switch(estado) {
      case 'pendiente': return 'Pendiente';
      case 'realizado': return 'Realizado';
      case 'cancelado': return 'Cancelado';
      default: return estado;
    }
  };

  useEffect(() => {
    listarPresupuestos();
  }, []);

  return (
    <div className="presupuestos-container">
      <div className="presupuestos-header">
        <div className="filtros">
          <div className="buscador">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Buscar presupuestos..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filtro-fecha">
            <input 
              type="date" 
              className="fecha-input"
              id="fechaDesde"
              placeholder="Fecha desde"
            />
            <span>-</span>
            <input 
              type="date" 
              className="fecha-input"
              id="fechaHasta"
              placeholder="Fecha hasta"
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
                  onClick={() => handleOpcionClick(opcion.id)}
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
        <table className="presupuestos-tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Validez</th>
              <th>Sucursal</th>
              <th>Proveedor</th>
              <th>RUC</th>
              <th>Nro Pedido</th>
              <th>Total</th>
              <th>Observación</th>
              <th>Estado</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {presupuestosFiltrados?.map((presupuesto) => (
              <tr key={presupuesto.id}>
                <td className="id-cell">#{presupuesto.codigo}</td>
                <td className="fecha-cell">{presupuesto.fecha}</td>
                <td className="fecha-cell">{presupuesto.fechaValidez}</td>
                <td className="sucursal-cell">{presupuesto.sucursal}</td>
                <td className="proveedor-cell">{presupuesto.proveedor}</td>
                <td className="ruc-cell">{presupuesto.ruc}</td>
                <td className="pedido-cell">{presupuesto.nroPedido}</td>
                <td className="total-cell">₲ {presupuesto.total?.toLocaleString("ES-es")}</td>
                <td className="observacion-cell" title={presupuesto.observacion}>
                  {presupuesto.observacion}
                </td>
                <td>
                  <span className={getEstadoClass(presupuesto.estado)}>
                    <i className={getEstadoIcon(presupuesto.estado)}></i>
                    {getEstadoText(presupuesto.estado)}
                  </span>
                </td>
                <td className="acciones">
                  <button className="btn-accion btn-detalles" title="Ver detalles">
                    <Eye size={16} />
                  </button>
                  <button className="btn-accion btn-editar" title="Editar">
                    <Edit2 size={16} />
                  </button>
                  <button 
                    className="btn-accion btn-eliminar" 
                    title="Eliminar"
                    onClick={() => handleEliminar(presupuesto)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para Nuevo Presupuesto */}
      <Modal visible={modalAbierto} whith={65}>
        <div className="modal-header">
          <h3>Crear Nuevo Presupuesto</h3>
          <button className="btn-cerrar" onClick={() => setModalAbierto(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body grid grid-cols-2 gap-4">
          <input
            type="date"
            className="modal-input"
            name="fecha"
            value={presupuestoModel.fecha}
            onChange={handleInputChange}
            placeholder="Fecha"
          />

          <input
            type="date"
            className="modal-input"
            name="fechaValidez"
            value={presupuestoModel.fechaValidez}
            onChange={handleInputChange}
            placeholder="Fecha de Validez"
          />

          <select
            className="modal-input"
            name="sucursal"
            value={presupuestoModel.sucursal}
            onChange={handleInputChange}
          >
            <option value="">Seleccione sucursal</option>
            <option value="Sucursal Central">Sucursal Central</option>
            <option value="Sucursal Norte">Sucursal Norte</option>
            <option value="Sucursal Sur">Sucursal Sur</option>
            <option value="Sucursal Este">Sucursal Este</option>
            <option value="Sucursal Oeste">Sucursal Oeste</option>
          </select>

          <input
            type="text"
            placeholder="Proveedor"
            className="modal-input"
            name="proveedor"
            value={presupuestoModel.proveedor}
            onChange={handleInputChange}
          />

          <input
            type="text"
            placeholder="RUC (ej: 80.123.456-7)"
            className="modal-input"
            name="ruc"
            value={presupuestoModel.ruc}
            onChange={handleInputChange}
          />

          <select
            className="modal-input"
            name="estado"
            value={presupuestoModel.estado}
            onChange={handleInputChange}
          >
            <option value="pendiente">Pendiente</option>
            <option value="realizado">Realizado</option>
            <option value="cancelado">Cancelado</option>
          </select>

          <div className="col-span-2">
            <textarea
              placeholder="Observación"
              className="modal-input w-full"
              name="observacion"
              value={presupuestoModel.observacion}
              onChange={handleInputChange}
              rows={3}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="btn-guardar"
            onClick={() => grabarPresupuesto()}
          >
            Crear Presupuesto
          </button>
        </div>
      </Modal>

      {/* Modal para Presupuesto desde Pedido */}
      <Modal visible={modalPedidoAbierto} whith={65}>
        <div className="modal-header">
          <h3>Crear Presupuesto desde Pedido</h3>
          <button className="btn-cerrar" onClick={() => setModalPedidoAbierto(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body grid grid-cols-2 gap-4">
          <select
            className="modal-input"
            name="nroPedido"
            value={presupuestoModel.nroPedido}
            onChange={handleInputChange}
          >
            <option value="">Seleccione un pedido</option>
            <option value="PED-001">PED-001 - Juan Pérez</option>
            <option value="PED-002">PED-002 - María González</option>
            <option value="PED-003">PED-003 - Carlos López</option>
            <option value="PED-004">PED-004 - Ana Martínez</option>
            <option value="PED-005">PED-005 - Roberto Silva</option>
          </select>

          <input
            type="date"
            className="modal-input"
            name="fecha"
            value={presupuestoModel.fecha}
            onChange={handleInputChange}
            placeholder="Fecha"
          />

          <input
            type="date"
            className="modal-input"
            name="fechaValidez"
            value={presupuestoModel.fechaValidez}
            onChange={handleInputChange}
            placeholder="Fecha de Validez"
          />

          <select
            className="modal-input"
            name="sucursal"
            value={presupuestoModel.sucursal}
            onChange={handleInputChange}
          >
            <option value="">Seleccione sucursal</option>
            <option value="Sucursal Central">Sucursal Central</option>
            <option value="Sucursal Norte">Sucursal Norte</option>
            <option value="Sucursal Sur">Sucursal Sur</option>
            <option value="Sucursal Este">Sucursal Este</option>
            <option value="Sucursal Oeste">Sucursal Oeste</option>
          </select>

          <input
            type="text"
            placeholder="Proveedor"
            className="modal-input"
            name="proveedor"
            value={presupuestoModel.proveedor}
            onChange={handleInputChange}
          />

          <input
            type="text"
            placeholder="RUC (ej: 80.123.456-7)"
            className="modal-input"
            name="ruc"
            value={presupuestoModel.ruc}
            onChange={handleInputChange}
          />

          <div className="col-span-2">
            <textarea
              placeholder="Observación"
              className="modal-input w-full"
              name="observacion"
              value={presupuestoModel.observacion}
              onChange={handleInputChange}
              rows={3}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="btn-guardar"
            onClick={() => grabarPresupuesto()}
          >
            Crear Presupuesto
          </button>
        </div>
      </Modal>

      {/* Componentes de notificaciones */}
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
        descripcion="¿Estás seguro de que quieres eliminar este presupuesto? Esta acción no se puede deshacer."
      />
    </div>
  );
};

export default Presupuestos;