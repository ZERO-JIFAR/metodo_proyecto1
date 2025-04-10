import React, { useEffect, useState } from "react";
import styles from "./ModalBacklog.module.css";
import { ITarea } from "../../../../types/ITarea";

interface ModalBacklogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (titulo: string, descripcion: string) => void;
  onUpdateTask: (titulo: string, descripcion: string) => void;
  isEditing: boolean;
  editingTask: ITarea | null;
}

const ModalBacklog: React.FC<ModalBacklogProps> = ({
  isOpen,
  onClose,
  onAddTask,
  onUpdateTask,
  isEditing,
  editingTask,
}) => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    if (isEditing && editingTask) {
      setTitulo(editingTask.titulo);
      setDescripcion(editingTask.descripcion);
    } else {
      setTitulo("");
      setDescripcion("");
    }
  }, [isEditing, editingTask]);

  const handleSubmit = () => {
    if (titulo && descripcion) {
      if (isEditing) {
        onUpdateTask(titulo, descripcion);
      } else {
        onAddTask(titulo, descripcion);
      }
    } else {
      alert("Por favor, completa el título y la descripción.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalBacklog}>
      <div className={styles.modalContentBacklog}>
        <h2 className={styles.modalTitleBacklog}>
          {isEditing ? "Editar Tarea de Backlog" : "Crear Tarea de Backlog"}
        </h2>
        <input
          className={styles.modalInputBacklog}
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título"
        />
        <textarea
          className={styles.modalTextareaBacklog}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción"
        />
        <div className={styles.modalButtonGroup}>
          <button className={styles.modalCancelButtonBacklog} onClick={onClose}>
            Cancelar
          </button>
          <button className={styles.modalButtonBacklog} onClick={handleSubmit}>
            {isEditing ? "Guardar Cambios" : "Crear Tarea"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalBacklog;
