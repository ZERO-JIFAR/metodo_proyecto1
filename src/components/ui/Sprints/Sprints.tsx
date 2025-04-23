import { useParams } from "react-router-dom";
import { useTareasStore } from "../../../store/tareaStore";
import styles from "./Sprints.module.css";

export const Sprints = () => {
  const { sprintId } = useParams<{ sprintId: string }>();
  const { sprintList } = useTareasStore();
  const sprint = sprintList.sprints.find((s) => s.id === sprintId);

  if (!sprint) {
    return <h2>Sprint no encontrado</h2>;
  }

  return (
    <div className={styles.sprintsGeneralContainer}>
      <h1>{sprint.nombre}</h1>
      <p>Inicio: {sprint.fechaInicio}</p>
      <p>Cierre: {sprint.fechaCierre}</p>
      <div>
        {sprint.tareas.map((tarea) => (
          <div key={tarea.id}>
            <h3>{tarea.titulo}</h3>
            <p>{tarea.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};