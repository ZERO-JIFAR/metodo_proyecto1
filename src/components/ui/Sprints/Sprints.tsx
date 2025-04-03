import { SprintsCard } from "../SprintsCard/SprintsCard"
import styles from "./Sprints.module.css"

export const Sprints = () => {
    return (
        <div className={styles.sprintsGeneralContainer}>
            {/* Traer nombre de la tarea. Agregar un Sprint */}
            <h1>Titulo de la tarea</h1>
            <p>Tareas de la sprints</p>
            <div className={styles.sprintsColumnsContainer}>
                <div className={styles.sprintsColumnContainer}>
                    <p>Pendiente</p>
                    {/*
                    <SprintsCard 
                        key={1}
                        handleOpenModalEdit={}
                        tarea={}
                    />
                    */}
                </div>
                <div className={styles.sprintsColumnContainer}>
                    <p>En Progreso</p>
                    {/*
                    <SprintsCard 
                        key={1}
                        handleOpenModalEdit={}
                        tarea={}
                    />
                    */}
                </div>
                <div className={styles.sprintsColumnContainer}>
                    <p>Completado</p>
                    {/*
                    <SprintsCard 
                        key={1}
                        handleOpenModalEdit={}
                        tarea={}
                    />
                    */}
                </div>
            </div>
        </div>
    )
}
