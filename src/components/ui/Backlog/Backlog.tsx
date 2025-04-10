import React, { useEffect, useState } from "react";
import styles from "./Backlog.module.css";
import ModalBacklog from "../../ui/Modal/ModalBacklog/ModalBacklog";
import { ITarea } from "../../../types/ITarea";
import {
  getAllTareas,
  postNuevaTarea,
  eliminarTareaPorID,
  editarTarea
} from "../../../http/tareas";

const Backlog: React.FC = () => {
  const [tasks, setTasks] = useState<ITarea[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState<ITarea | null>(null);

  const fetchBacklog = async () => {
    const tareas = await getAllTareas();
    const backlogFiltrado = tareas?.filter((t) => t.tipo === "backlog") || [];
    setTasks(backlogFiltrado);
  };

  useEffect(() => {
    fetchBacklog();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
    setIsEditing(false);
    setEditingTask(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
    setIsEditing(false);
  };

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

  const handleDelete = async (id: string) => {
    await eliminarTareaPorID(id);
    fetchBacklog();
  };

  const handleEdit = (task: ITarea) => {
    setEditingTask(task);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const updateTask = async (titulo: string, descripcion: string) => {
    if (!editingTask) return;
    const tareaActualizada: ITarea = {
      ...editingTask,
      titulo,
      descripcion,
    };
    await editarTarea(tareaActualizada);
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
            <div className={styles.taskButtons}>
              <button onClick={() => handleEdit(task)} className={styles.editButton}>✏️</button>
              <button onClick={() => handleDelete(task.id!)} className={styles.deleteButton}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
      <ModalBacklog
        isOpen={isModalOpen}
        onClose={closeModal}
        onAddTask={addTask}
        onUpdateTask={updateTask}
        isEditing={isEditing}
        editingTask={editingTask}
      />
    </div>
  );
};

export default Backlog;
