import { X } from "lucide-react";

const Modal = ({ visible, children, whith }) => {
  return visible ? (
    <div className="modal-overlay">
      <div className="modal" style={{ width: `${whith}% ` }}>
        {children}
      </div>
    </div>
  ) : (
    ""
  );
};

export default Modal;
