import React from 'react';
import styles from './Backlog.module.css';

const Backlog = () => {
  return (
    <div className={styles.backlogContainer}>
      <div className={styles.headerContainer}>
        <h1 className={styles.backlogTitle}>Backlog</h1>
        <button className={styles.addTaskButton}>➕</button>
      </div>
      <div className={styles.taskList}>
        {/* tarjeta */}
      </div>
    </div>
  );
};

export default Backlog;
