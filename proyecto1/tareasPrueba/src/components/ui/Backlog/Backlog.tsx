import React from 'react';
import styles from './Backlog.module.css';

const Backlog = () => {
  return (
    <div className={styles.backlogContainer}>
      <h1 className={styles.backlogTitle}>Backlog</h1>
      <div className={styles.taskList}>
        <h2 className={styles.taskListTitle}>Tareas en el Backlog</h2>
        <button className={styles.addTaskButton}>➕</button>
        <div className={styles.taskItem}>
          <strong className={styles.taskTitle}>Título:</strong> Tarea 5  
          <strong className={styles.taskDescription}> Descripción:</strong> Programar el Backend
        </div>
      </div>
    </div>
  );
};

export default Backlog;
