import { FC, useState, useEffect } from "react";
import styles from "./lisTareas.module.css";
import { ITareaBacklog } from "../../../types/ITareaBacklog";
import { ISprint } from "../../../types/ISprint";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Modal from "react-modal";
import {
  addTareaToSprintController,
  getSprintsController,
} from "../../../data/controllers/sprintController";
import { deleteTareaController, getTareasController } from "../../../data/controllers/backlogController";

Modal.setAppElement("#root");

type IPropsIProyecto = {
  proyecto: ITareaBacklog;
  onEdit: () => void;
  onDelete: (id: string) => void;
  setTareas: React.Dispatch<React.SetStateAction<ITareaBacklog[]>>;
};

const formatearFecha = (fecha: string): string => {
  return new Date(fecha).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const ListTareas: FC<IPropsIProyecto> = ({
  proyecto,
  onEdit,
  onDelete,
  setTareas,
}) => {
  const [sprints, setSprints] = useState<ISprint[]>([]);
  const [selectedSprint, setSelectedSprint] = useState<string>("");

  useEffect(() => {
    const fetchSprints = async () => {
      const data = await getSprintsController();
      if (data) {
        setSprints(data);
      }
    };

    fetchSprints();
  }, []);

  const handleSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sprintId = e.target.value;
    setSelectedSprint(sprintId);

    if (!sprintId) return;

    try {
      // Crear la tarea para el sprint seleccionado
      const nuevaTarea = {
        id: Date.now().toString(),
        titulo: proyecto.nombre,
        descripcion: proyecto.descripcion,
        estado: "pendiente",
        fechaLimite: proyecto.fechaFin,
      };

      // Agregar la tarea al sprint
      await addTareaToSprintController(sprintId, nuevaTarea);

      // Eliminar la tarea del backlog
      await deleteTareaController(proyecto.id);

      // Refrescar las tareas del backlog
      const tareasActualizadas = await getTareasController();
      setTareas(tareasActualizadas || []);
    } catch (error) {
      console.error("Error al mover la tarea al sprint", error);
    }
  };

  return (
    <div className={styles.proyecto}>
      <div className={styles.cont}>
        <div className={styles.containerRow}>
          <span className={styles.titulo}>
            <strong>Nombre:</strong> {proyecto.nombre}
          </span>

          <span className={styles.descripcion}>
            <strong>Descripción:</strong> {proyecto.descripcion}
          </span>

          <span className={styles.fecha}>
            <strong>Fecha de inicio:</strong> {formatearFecha(proyecto.fechaInicio)}
          </span>

          <span className={styles.fecha}>
            <strong>Fecha de fin:</strong> {formatearFecha(proyecto.fechaFin)}
          </span>

          <div className={styles.selectContainer}>
            <select
              className={styles.select}
              value={selectedSprint}
              onChange={handleSelectChange}
            >
              <option value="">Seleccione un Sprint</option>
              {sprints.map((sprint) => (
                <option key={sprint.id} value={sprint.id}>
                  {sprint.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.acciones}>
          <button onClick={onEdit}>
            <FaEdit size={25} color="#0D7DD8" />
          </button>

          <button onClick={() => onDelete(proyecto.id)}>
            <FaTrash size={25} color="#A90505" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListTareas;