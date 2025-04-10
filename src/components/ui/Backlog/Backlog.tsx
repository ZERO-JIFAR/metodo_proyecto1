import React, { useEffect, useState } from "react";
import styles from "./Backlog.module.css";
import ModalBacklog from "../../ui/Modal/ModalBacklog/ModalBacklog";
import { ITarea } from "../../../types/ITarea";
import { getAllTareas, postNuevaTarea } from "../../../http/tareas";

const Backlog: React.FC = () => {
  const [tasks, setTasks] = useState<ITarea[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchBacklog = async () => {
    const tareas = await getAllTareas();
    const backlogFiltrado = tareas?.filter((t) => t.tipo === "backlog") || [];
    setTasks(backlogFiltrado);
  };

  useEffect(() => {
    fetchBacklog();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addTask = async (titulo: string, descripcion: string) => {
    const nuevaTarea: ITarea = {
      titulo,
      descripcion,
      fechaInicio: "",
      fechaLimite: "",
      tipo: "backlog",
    };
    await postNuevaTarea(nuevaTarea);
    fetchBacklog();
    closeModal();
  };

  return (
    <div className={styles.backlogContainer}>
      <div className={styles.headerContainer}>
        <h1 className={styles.backlogTitle}>Backlog</h1>
        <button className={styles.addTaskButton} onClick={openModal}>➕</button>
      </div>
      <div className={styles.taskList}>
        {tasks.map((task) => (
          <div key={task.id} className={styles.taskItem}>
            <strong className={styles.taskTitle}>Título:</strong> {task.titulo}
            <strong className={styles.taskDescription}> Descripción:</strong> {task.descripcion}
          </div>
        ))}
      </div>
      <ModalBacklog isOpen={isModalOpen} onClose={closeModal} onAddTask={addTask} />
    </div>
  );
};

export default Backlog;
