// Backlog.tsx
import React, { useState } from 'react';
import styles from './Backlog.module.css';
import Modal from '../Modal/ModalBacklog/ModalBacklog';

const Backlog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.backlogContainer}>
      <h1 className={styles.backlogTitle}>Backlog</h1>
      <div className={styles.taskList}>
        <h2 className={styles.taskListTitle}>Tareas en el Backlog</h2>
        <button className={styles.addTaskButton} onClick={() => setIsModalOpen(true)}>
          ➕
        </button>
      </div>
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Backlog;
