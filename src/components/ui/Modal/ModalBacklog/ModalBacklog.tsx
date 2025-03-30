// Modal.tsx
import React from "react";
import styles from "./ModalBacklog.module.css";

// Definir el tipo de las props
interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Agregar Nueva Tarea</h2>
        <input type="text" placeholder="Título de la tarea" />
        <textarea placeholder="Descripción de la tarea"></textarea>
        <button>Agregar</button>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default Modal;
