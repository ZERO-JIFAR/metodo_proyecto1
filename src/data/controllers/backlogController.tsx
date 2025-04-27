import axios from "axios";
import { ITareaBacklog } from "../../types/ITareaBacklog";

const API_URL = `${import.meta.env.VITE_API_URL}/backlog`;

// 🔹 Obtener todas las tareas del Backlog
export const getTareasController = async (): Promise<ITareaBacklog[] | undefined> => {
  try {
    const response = await axios.get<{ tareas: ITareaBacklog[] }>(API_URL);
    return response.data.tareas;
  } catch (error) {
    console.error("❌ Error en getTareasController:", error);
  }
};

// 🔹 Crear nueva tarea en el Backlog
export const createTareaController = async (tareaNueva: ITareaBacklog) => {
  try {
    const backlogResponse = await axios.get<{ tareas: ITareaBacklog[] }>(API_URL);
    const tareasActuales = backlogResponse.data.tareas;

    const nuevasTareas = [...tareasActuales, tareaNueva];
    await axios.put(API_URL, { tareas: nuevasTareas });

    return tareaNueva;
  } catch (error) {
    console.error("❌ Error en createTareaController:", error);
  }
};

// 🔹 Actualizar una tarea existente
export const updateTareaController = async (tareaActualizada: ITareaBacklog) => {
  try {
    const backlogResponse = await axios.get<{ tareas: ITareaBacklog[] }>(API_URL);
    const tareasActuales = backlogResponse.data.tareas;

    const tareasActualizadas = tareasActuales.map(tarea =>
      tarea.id === tareaActualizada.id ? tareaActualizada : tarea
    );

    await axios.put(API_URL, { tareas: tareasActualizadas });

    return tareaActualizada;
  } catch (error) {
    console.error("❌ Error en updateTareaController:", error);
  }
};

// 🔹 Eliminar una tarea por ID
export const deleteTareaController = async (idTareaAEliminar: string) => {
  try {
    const backlogResponse = await axios.get<{ tareas: ITareaBacklog[] }>(API_URL);
    const tareasActuales = backlogResponse.data.tareas;

    const tareasFiltradas = tareasActuales.filter(tarea => tarea.id !== idTareaAEliminar);

    await axios.put(API_URL, { tareas: tareasFiltradas });

  } catch (error) {
    console.error("❌ Error en deleteTareaController:", error);
  }
};
