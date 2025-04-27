import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ISprint } from "../../../types/ISprint";
import styles from "./sprint.module.css";
import { updateSprintController, deleteSprintController, getSprintsController } from "../../../data/controllers/sprintController";
import SprintModal from "../../ui/modalSprint/modalSprint";
import TareaModal from "../../ui/modalBacklog/modalBacklog";
import { ITareaSprint } from "../../../types/ITareaSprint";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const SprintScreen = () => {
  const { id } = useParams<{ id: string }>();
  const [sprintData, setSprintData] = useState<ISprint | null>(null);
  const [modalSprintVisible, setModalSprintVisible] = useState(false);
  const [modalTareaVisible, setModalTareaVisible] = useState(false);
  const [tareaSeleccionada, setTareaSeleccionada] = useState<ITareaSprint | null>(null);

  useEffect(() => {
    if (id) {
      loadSprintData();
    }
  }, [id]);

  const loadSprintData = async () => {
    try {
      const sprints = await getSprintsController();
      if (!sprints) throw new Error("No se pudieron obtener los sprints");
      const sprint = sprints.find((s) => s.id === id);
      if (!sprint) throw new Error("Sprint no encontrado");
      setSprintData(sprint);
    } catch (error) {
      console.error("❌ Error al cargar el sprint:", error);
    }
  };

  const handleEditarSprint = async (sprintActualizado: ISprint) => {
    try {
      await updateSprintController(sprintActualizado);
      setSprintData(sprintActualizado);
      setModalSprintVisible(false);
    } catch (error) {
      console.error("❌ Error al editar el sprint:", error);
    }
  };

  const handleDeleteTarea = async (tareaId: string) => {
    if (!sprintData) return;
    const nuevasTareas = sprintData.tareas.filter((t) => t.id !== tareaId);
    const sprintActualizado = { ...sprintData, tareas: nuevasTareas };

    try {
      await updateSprintController(sprintActualizado);
      setSprintData(sprintActualizado);
    } catch (error) {
      console.error("❌ Error al eliminar la tarea:", error);
    }
  };

  const handleEditTarea = (tarea: ITareaSprint) => {
    setTareaSeleccionada(tarea);
    setModalTareaVisible(true);
  };

  const renderTareasPorEstado = (estado: string) => {
    if (!sprintData) return null;

    const tareasFiltradas = sprintData.tareas.filter((t) => t.estado === estado);

    return tareasFiltradas.map((tarea) => (
      <div key={tarea.id} className={styles.tareaCard}>
        <h4>{tarea.titulo}</h4>
        <p>{tarea.descripcion}</p>
        <p><strong>Vence:</strong> {new Date(tarea.fechaLimite).toLocaleDateString()}</p>

        <div className={styles.btnMover}>
          {estado !== "pendiente" && (
            <button onClick={() => moverTarea(tarea.id, estado, -1)}>
              <FaArrowLeft />
            </button>
          )}
          {estado !== "finalizada" && (
            <button onClick={() => moverTarea(tarea.id, estado, 1)}>
              <FaArrowRight />
            </button>
          )}
        </div>

        <button className={styles.deleteButton} onClick={() => handleDeleteTarea(tarea.id)}>
          Eliminar
        </button>
      </div>
    ));
  };

  const moverTarea = async (tareaId: string, estadoActual: string, direccion: number) => {
    if (!sprintData) return;

    const estados = ["pendiente", "en proceso", "finalizada"];
    const idx = estados.indexOf(estadoActual);
    const nuevoEstado = estados[idx + direccion];

    if (!nuevoEstado) return;

    const nuevasTareas = sprintData.tareas.map((t) =>
      t.id === tareaId ? { ...t, estado: nuevoEstado } : t
    );

    const actualizado = { ...sprintData, tareas: nuevasTareas };

    try {
      await updateSprintController(actualizado);
      setSprintData(actualizado);
    } catch (error) {
      console.error("❌ Error al mover la tarea:", error);
    }
  };

  const handleGuardarTarea = async (tarea: ITareaSprint) => {
    if (!sprintData) return;

    const tareasActualizadas = sprintData.tareas.map((t) =>
      t.id === tarea.id ? tarea : t
    );

    const sprintActualizado = { ...sprintData, tareas: tareasActualizadas };

    try {
      await updateSprintController(sprintActualizado);
      setSprintData(sprintActualizado);
      setModalTareaVisible(false);
      setTareaSeleccionada(null);
    } catch (error) {
      console.error("❌ Error al guardar la tarea:", error);
    }
  };

  const handleCrearSprint = async (sprint: ISprint) => {
    try {
      await updateSprintController(sprint);
      loadSprintData();
      setModalSprintVisible(false);
    } catch (error) {
      console.error("❌ Error al crear el sprint:", error);
    }
  };

  if (!sprintData) return <p>Loading sprint...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.sprintName}>Sprint: {sprintData.nombre}</h2>

        <div className={styles.buttonRow}>
          <button
            className={styles.createButton}
            onClick={() => {
              setTareaSeleccionada(null);
              setModalTareaVisible(true);
            }}
          >
            + Crear nueva tarea
          </button>
        </div>
      </div>

      <div className={styles.taskColumns}>
        <div className={styles.column}>
          <h3>Pendiente</h3>
          {renderTareasPorEstado("pendiente")}
        </div>
        <div className={styles.column}>
          <h3>En Proceso</h3>
          {renderTareasPorEstado("en proceso")}
        </div>
        <div className={styles.column}>
          <h3>Finalizada</h3>
          {renderTareasPorEstado("finalizada")}
        </div>
      </div>

      {modalSprintVisible && (
        <SprintModal
          sprint={sprintData}
          closeModal={() => setModalSprintVisible(false)}
          refreshSprints={loadSprintData}
          onCrearSprint={handleCrearSprint}
        />
      )}

      {modalTareaVisible && (
        <TareaModal
          tarea={tareaSeleccionada}
          closeModal={() => {
            setModalTareaVisible(false);
            setTareaSeleccionada(null);
          }}
          sprint={sprintData}
          onGuardarTarea={handleGuardarTarea}
        />
      )}
    </div>
  );
};

export default SprintScreen;
