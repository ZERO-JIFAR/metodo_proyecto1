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

  const handleAddTask = async () => {
    if (titulo && descripcion) {
      const nuevaTarea = {
        id: Date.now().toString(),
        titulo,
        descripcion
      };

      try {
        const response = await fetch('http://localhost:3001/backlog', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(nuevaTarea)
        });

        if (response.ok) {
          onAddTask(titulo, descripcion);
          setTitulo('');
          setDescripcion('');
          onClose();
        } else {
          alert('Error al guardar la tarea en la base de datos.');
        }
      } catch (error) {
        alert('Error de conexión con el servidor.');
        console.error(error);
      }
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
