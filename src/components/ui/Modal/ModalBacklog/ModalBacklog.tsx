import React, { useState } from 'react';
import styles from './ModalBacklog.module.css';

interface ModalBacklogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (titulo: string, descripcion: string) => void;
}

const ModalBacklog: React.FC<ModalBacklogProps> = ({ isOpen, onClose, onAddTask }) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleAddTask = () => {
    if (titulo && descripcion) {
      onAddTask(titulo, descripcion);
      setTitulo('');
      setDescripcion('');
    } else {
      alert('Por favor, completa el título y la descripción.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalBacklog}>
      <div className={styles.modalContentBacklog}>
        <h2 className={styles.modalTitleBacklog}>Crear Tarea de Backlog</h2>

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
          <button className={styles.modalButtonBacklog} onClick={handleAddTask}>
            Crear Tarea
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalBacklog;
