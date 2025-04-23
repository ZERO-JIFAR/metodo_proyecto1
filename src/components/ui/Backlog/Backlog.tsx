import React, { useEffect, useState } from "react";
import styles from "./Backlog.module.css";
import ModalBacklog from "../../ui/Modal/ModalBacklog/ModalBacklog";
import { ITarea } from "../../../types/ITarea";
import { useTareasStore } from "../../../store/tareaStore";

const Backlog: React.FC = () => {
  const {
    backlog,
    moverTareaASprint,
    agregarTareaBacklog,
    actualizarTarea,
    eliminarTarea,
    setTareaActiva,
    tareaActiva,
    cargarDatos,
  } = useTareasStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  const openModal = () => {
    setTareaActiva(null); // Limpia la tarea activa para crear una nueva
    setIsModalOpen(true);
  };

  const handleEdit = (tarea: ITarea) => {
    setTareaActiva(tarea); // Establece la tarea activa para editar
    setIsModalOpen(true); // Abre el modal en modo edición
  };

  const handleDelete = async (id: string) => {
    await eliminarTarea(id); // Elimina la tarea seleccionada
  };

  const handleMoveToSprint = async (tareaId: string) => {
    const sprintId = prompt("Ingrese el ID del sprint al que desea mover la tarea:");
    if (sprintId) {
      await moverTareaASprint(tareaId, sprintId); // Mueve la tarea al sprint especificado
    }
  };

  return (
    <div className={styles.backlogContainer}>
      <div className={styles.headerContainer}>
        <h1 className={styles.backlogTitle}>Backlog</h1>
        <button className={styles.addTaskButton} onClick={openModal}>
          ➕
        </button>
      </div>
      <div className={styles.taskList}>
        {backlog.tareas.map((task) => (
          <div key={task.id} className={styles.taskItem}>
            <div className={styles.taskContent}>
              <div className={styles.taskDetails}>
                <strong className={styles.taskTitle}>Título:</strong> {task.titulo}
                <strong className={styles.taskDescription}>Descripción:</strong> {task.descripcion}
              </div>
              <div className={styles.taskButtons}>
                <button onClick={() => handleEdit(task)} className={styles.editButton}>
                  ✏️
                </button>
                <button onClick={() => handleDelete(task.id!)} className={styles.deleteButton}>
                  🗑️
                </button>
                <button
                  onClick={() => handleMoveToSprint(task.id!)}
                  className={styles.moveButton}
                >
                  ➡️ Mover a Sprints
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ModalBacklog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Backlog;