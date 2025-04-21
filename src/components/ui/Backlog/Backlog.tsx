import React, { useEffect, useState } from "react";
import styles from "./Backlog.module.css";
import ModalBacklog from "../../ui/Modal/ModalBacklog/ModalBacklog";
import { ITarea } from "../../../types/ITarea";
import { useTareasStore } from "../../../store/tareaStore";

const Backlog: React.FC = () => {
  const {
    tareas,
    cargarTareas,
    agregarTarea,
    actualizarTarea,
    eliminarTarea,
    setTareaActiva,
    tareaActiva,
  } = useTareasStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const tareasBacklog = tareas.filter((t) => t.tipo === "backlog");

  useEffect(() => {
    cargarTareas();
  }, [cargarTareas]);

  const openModal = () => {
    setTareaActiva(null);
    setIsModalOpen(true);
  };

  const handleEdit = (tarea: ITarea) => {
    setTareaActiva(tarea);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    await eliminarTarea(id);
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
        {tareasBacklog.map((task) => (
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