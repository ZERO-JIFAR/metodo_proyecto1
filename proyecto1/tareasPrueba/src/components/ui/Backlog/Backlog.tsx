import React, { useState } from 'react';
import styles from './Backlog.module.css';
import ModalBacklog from '../../ui/Modal/ModalBacklog/ModalBacklog';


interface Task {
  title: string;
  description: string;
}

const Backlog: React.FC = () => {
 
  const [tasks, setTasks] = useState<Task[]>([]);


  const [isModalOpen, setIsModalOpen] = useState(false);

  
  const openModal = () => {
    setIsModalOpen(true);
  };

  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  
  const addTask = (title: string, description: string) => {
    const newTask: Task = {
      title,
      description,
    };
    setTasks([...tasks, newTask]);
    closeModal(); 
  };

  return (
    <div className={styles.backlogContainer}>
      <div className={styles.headerContainer}>
        <h1 className={styles.backlogTitle}>Backlog</h1>
        <button className={styles.addTaskButton} onClick={openModal}>➕</button>
      </div>
      <div className={styles.taskList}>
        {tasks.map((task, index) => (
          <div key={index} className={styles.taskItem}>
            <strong className={styles.taskTitle}>Título:</strong> {task.title}
            <strong className={styles.taskDescription}> Descripción:</strong> {task.description}
          </div>
        ))}
      </div>

      {/* Modal */}
      <ModalBacklog 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        onAddTask={addTask} 
      />
    </div>
  );
};

export default Backlog;
