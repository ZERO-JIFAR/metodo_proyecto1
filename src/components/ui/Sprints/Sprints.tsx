import { SprintColumn } from "./SprintsColumn/SprintsColumn"
import styles from "./Sprints.module.css"

export const Sprints = () => {
    return (
        <div className={styles.sprintsGeneralContainer}>
            {/* Traer nombre de la tarea. Agregar un Sprint */}
            <h1><em>Titulo de la tarea</em></h1>
            <p>Tareas de la sprints</p>
            <div className={styles.sprintsColumnsContainer}>
                <div className={styles.sprintsColumnContainer}>
                    
                    <SprintColumn estado="pendiente" titulo="Pendiente" />
                </div>
                <div className={styles.sprintsColumnContainer}>
                    
                    <SprintColumn estado="en-progreso" titulo="En Progreso" />
                </div>
                <div className={styles.sprintsColumnContainer}>
                    
                    <SprintColumn estado="completado" titulo="Completado" />
                </div>
            </div>
        </div>
    )
}
