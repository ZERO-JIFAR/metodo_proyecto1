import React, { useState } from 'react';
import styles from './ModalBacklog.module.css';

interface ModalBacklogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (title: string, description: string) => void;
}

const ModalBacklog: React.FC<ModalBacklogProps> = ({ isOpen, onClose, onAddTask }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleAddTask = () => {
    if (taskTitle && taskDescription) {
      onAddTask(taskTitle, taskDescription);
      setTaskTitle('');
      setTaskDescription('');
    } else {
      alert('Por favor, ingresa un título y una descripción para la tarea.');
    }
  };

  if (!isOpen) return null; // Si el modal no está abierto, no renderiza nada.

  return (
    <div className={styles.modalBacklog}>
      <div className={styles.modalContentBacklog}>
        <h2 className={styles.modalTitleBacklog}>Crear Nueva Tarea</h2>
        <label className={styles.modalLabelBacklog}>
          Título:
          <input 
            className={styles.modalInputBacklog}
            type="text" 
            value={taskTitle} 
            onChange={(e) => setTaskTitle(e.target.value)} 
            placeholder="Ingresa el título de la tarea" 
          />
        </label>
        <label className={styles.modalLabelBacklog}>
          Descripción:
          <textarea 
            className={styles.modalTextareaBacklog}
            value={taskDescription} 
            onChange={(e) => setTaskDescription(e.target.value)} 
            placeholder="Ingresa la descripción de la tarea" 
          />
        </label>
        <button className={styles.modalButtonBacklog} onClick={handleAddTask}>Agregar Tarea</button>
        <button className={styles.modalCancelButtonBacklog} onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default ModalBacklog;
