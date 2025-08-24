import React from 'react'

const Pedidos = () => {
  return (
    <div className="pedidos-container">
        <div className="pedidos-header">
            <div className="filtros">
                <div className="buscador">
                    <i className="fas fa-search search-icon"></i>
                    <input 
                        type="text" 
                        placeholder="Buscar pedidos..." 
                        className="search-input"
                        id="busqueda"
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
                <button className="btn-agregar" >
                    <i className="fas fa-plus"></i>
                    Nuevo
                </button>
                <div className="tooltip-menu" id="tooltipMenu" >
                    <button className="tooltip-option" >
                        <i className="fas fa-shopping-cart"></i>
                        Nuevo Pedido
                    </button>
                    <button className="tooltip-option" >
                        <i className="fas fa-file-import"></i>
                        Importar Pedidos
                    </button>
                    <button className="tooltip-option">
                        <i className="fas fa-file-export"></i>
                        Exportar Pedidos
                    </button>
                </div>
            </div>
        </div>

        <div className="tabla-container">
            <table className="pedidos-tabla">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fecha</th>
                        <th>Usuario</th>
                        <th>Sucursal</th>
                        <th>Observación</th>
                        <th>Estado</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="id-cell">#PED-001</td>
                        <td className="fecha-cell">25/08/2025</td>
                        <td className="usuario-cell">Juan Pérez</td>
                        <td className="sucursal-cell">Sucursal Central</td>
                        <td className="observacion-cell">Pedido urgente para cliente VIP, requiere entrega inmediata</td>
                        <td>
                            <span className="estado pendiente">
                                <i className="fas fa-clock"></i>
                                Pendiente
                            </span>
                        </td>
                        <td className="acciones">
                            <button className="btn-accion btn-detalles" onclick="verDetalles('PED-001')" title="Ver detalles">
                                <i className="fas fa-eye"></i>
                            </button>
                            <button className="btn-accion btn-eliminar" onclick="eliminarPedido('PED-001')" title="Eliminar">
                                <i className="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td className="id-cell">#PED-002</td>
                        <td className="fecha-cell">24/08/2025</td>
                        <td className="usuario-cell">María González</td>
                        <td className="sucursal-cell">Sucursal Norte</td>
                        <td className="observacion-cell">Pedido regular mensual</td>
                        <td>
                            <span className="estado aprobado">
                                <i className="fas fa-check"></i>
                                Aprobado
                            </span>
                        </td>
                        <td className="acciones">
                            <button className="btn-accion btn-detalles" onclick="verDetalles('PED-002')" title="Ver detalles">
                                <i className="fas fa-eye"></i>
                            </button>
                            <button className="btn-accion btn-eliminar" onclick="eliminarPedido('PED-002')" title="Eliminar">
                                <i className="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td className="id-cell">#PED-003</td>
                        <td className="fecha-cell">23/08/2025</td>
                        <td className="usuario-cell">Carlos López</td>
                        <td className="sucursal-cell">Sucursal Sur</td>
                        <td className="observacion-cell">Revisar disponibilidad de stock antes de procesar</td>
                        <td>
                            <span className="estado procesando">
                                <i className="fas fa-spinner"></i>
                                Procesando
                            </span>
                        </td>
                        <td className="acciones">
                            <button className="btn-accion btn-detalles" onclick="verDetalles('PED-003')" title="Ver detalles">
                                <i className="fas fa-eye"></i>
                            </button>
                            <button className="btn-accion btn-eliminar" onclick="eliminarPedido('PED-003')" title="Eliminar">
                                <i className="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td className="id-cell">#PED-004</td>
                        <td className="fecha-cell">22/08/2025</td>
                        <td className="usuario-cell">Ana Martínez</td>
                        <td className="sucursal-cell">Sucursal Este</td>
                        <td className="observacion-cell">Cliente solicita cambio en especificaciones</td>
                        <td>
                            <span className="estado rechazado">
                                <i className="fas fa-times"></i>
                                Rechazado
                            </span>
                        </td>
                        <td className="acciones">
                            <button className="btn-accion btn-detalles" onclick="verDetalles('PED-004')" title="Ver detalles">
                                <i className="fas fa-eye"></i>
                            </button>
                            <button className="btn-accion btn-eliminar" onclick="eliminarPedido('PED-004')" title="Eliminar">
                                <i className="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td className="id-cell">#PED-005</td>
                        <td className="fecha-cell">21/08/2025</td>
                        <td className="usuario-cell">Roberto Silva</td>
                        <td className="sucursal-cell">Sucursal Oeste</td>
                        <td className="observacion-cell">Pedido de emergencia</td>
                        <td>
                            <span className="estado aprobado">
                                <i className="fas fa-check"></i>
                                Aprobado
                            </span>
                        </td>
                        <td className="acciones">
                            <button className="btn-accion btn-detalles" onclick="verDetalles('PED-005')" title="Ver detalles">
                                <i className="fas fa-eye"></i>
                            </button>
                            <button className="btn-accion btn-eliminar" onclick="eliminarPedido('PED-005')" title="Eliminar">
                                <i className="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td className="id-cell">#PED-006</td>
                        <td className="fecha-cell">20/08/2025</td>
                        <td className="usuario-cell">Luis Rodríguez</td>
                        <td className="sucursal-cell">Sucursal Central</td>
                        <td className="observacion-cell">Pedido con descuento especial del 15%</td>
                        <td>
                            <span className="estado pendiente">
                                <i className="fas fa-clock"></i>
                                Pendiente
                            </span>
                        </td>
                        <td className="acciones">
                            <button className="btn-accion btn-detalles" onclick="verDetalles('PED-006')" title="Ver detalles">
                                <i className="fas fa-eye"></i>
                            </button>
                            <button className="btn-accion btn-eliminar" onclick="eliminarPedido('PED-006')" title="Eliminar">
                                <i className="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td className="id-cell">#PED-007</td>
                        <td className="fecha-cell">19/08/2025</td>
                        <td className="usuario-cell">Carmen Vega</td>
                        <td className="sucursal-cell">Sucursal Norte</td>
                        <td className="observacion-cell">Requiere autorización del supervisor</td>
                        <td>
                            <span className="estado procesando">
                                <i className="fas fa-spinner"></i>
                                Procesando
                            </span>
                        </td>
                        <td className="acciones">
                            <button className="btn-accion btn-detalles" onclick="verDetalles('PED-007')" title="Ver detalles">
                                <i className="fas fa-eye"></i>
                            </button>
                            <button className="btn-accion btn-eliminar" onclick="eliminarPedido('PED-007')" title="Eliminar">
                                <i className="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Pedidos
