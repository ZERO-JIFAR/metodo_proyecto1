import React, { useEffect, useState } from 'react';
import styles from './ModalBacklog.module.css';
import { useTareasStore } from "../../../../store/tareaStore";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalBacklog: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { agregarTarea, actualizarTarea, tareaActiva, setTareaActiva } = useTareasStore();
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    if (tareaActiva && tareaActiva.tipo === "backlog") {
      setTitulo(tareaActiva.titulo);
      setDescripcion(tareaActiva.descripcion);
    } else {
      setTitulo('');
      setDescripcion('');
    }
  }, [tareaActiva]);

  const handleSubmit = async () => {
    if (!titulo || !descripcion) {
      alert("Completa todos los campos");
      return;
    }

    if (tareaActiva && tareaActiva.tipo === "backlog") {
      await actualizarTarea({ ...tareaActiva, titulo, descripcion });
    } else {
      await agregarTarea({
        id: new Date().getTime().toString(),
        titulo,
        descripcion,
        fechaInicio: "",
        fechaLimite: "",
        tipo: "backlog",
      });
    }

    setTareaActiva(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalBacklog}>
      <div className={styles.modalContentBacklog}>
        <h2 className={styles.modalTitleBacklog}>
          {tareaActiva && tareaActiva.tipo === "backlog" ? "Editar Tarea" : "Crear Tarea de Backlog"}
        </h2>
        <input
          className={styles.modalInputBacklog}
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <textarea
          className={styles.modalTextareaBacklog}
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <div className={styles.modalButtonGroup}>
          <button onClick={onClose} className={styles.modalCancelButtonBacklog}>Cancelar</button>
          <button onClick={handleSubmit} className={styles.modalButtonBacklog}>
            {tareaActiva && tareaActiva.tipo === "backlog" ? "Guardar Cambios" : "Crear Tarea"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalBacklog;
