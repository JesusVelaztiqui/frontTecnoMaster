import React from "react";

const EliminarModal = ({
  isOpen,
  onClose,
  onEliminar,
  titulo,
  descripcion,
}) => {
  if (!isOpen) return null;

  const handleEliminar = async () => {
    await onEliminar();
    onClose();
  };

  return (
    <div className="eliminar-overlay" onClick={onClose}>
      <div className="eliminar-content" onClick={(e) => e.stopPropagation()}>
        <div className="eliminar-header">
          <h2 className="eliminar-title">{titulo}</h2>
        </div>

        <div className="eliminar-body">
          <p className="eliminar-description">{descripcion}</p>
        </div>

        <div className="eliminar-footer">
          <button
            className="eliminar-btn eliminar-btn-cancelar"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="eliminar-btn eliminar-btn-eliminar"
            onClick={handleEliminar}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EliminarModal;
