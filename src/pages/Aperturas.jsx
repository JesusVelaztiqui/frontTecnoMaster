import { Plus, Search } from "lucide-react";
import { useState } from "react";

const Aperturas = () => {
  const [tipoFiltro, setTipoFiltro] = useState("apertura");
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);
  const opcionesNuevo = [
    { id: "Caja", label: "Caja", icon: "fas fa-truck-loading" },
    { id: "Apertura", label: "Apertura", icon: "fas fa-folder" },
  ];
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
              Apertura y Cierre
            </button>
            <button
              className={`filter-btn ${
                tipoFiltro === "sucursales" ? "active" : ""
              }`}
              onClick={() => setTipoFiltro("sucursales")}
            >
              Cajas
            </button>
          </div>
          <div className="buscador">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder={`Buscar ${tipoFiltro}...`}
              // value={busqueda}
              // onChange={(e) => setBusqueda(e.target.value)}
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
                    if (opcion.id === "Caja") {
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
    </div>
  );
};

export default Aperturas;
