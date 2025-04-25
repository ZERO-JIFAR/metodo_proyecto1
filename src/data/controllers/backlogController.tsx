import axios from "axios";
import { ITareaBacklog } from "../../types/ITareaBacklog";

const API_URL = `${import.meta.env.VITE_API_URL}/Backlog`;

// 🔹 Obtener todas las tareas del Backlog
export const getTareasController = async (): Promise<ITareaBacklog[] | undefined> => {
  try {
    const response = await axios.get<ITareaBacklog[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("❌ Error en getTareasController:", error);
  }
};

// 🔹 Crear nueva tarea en el Backlog
export const createTareaController = async (tareaNueva: ITareaBacklog) => {
  try {
    await axios.post(API_URL, tareaNueva);
    return tareaNueva;
  } catch (error) {
    console.error("❌ Error en createTareaController:", error);
  }
};

// 🔹 Actualizar una tarea existente
export const updateTareaController = async (tareaActualizada: ITareaBacklog) => {
  try {
    await axios.put(`${API_URL}/${tareaActualizada.id}`, tareaActualizada);
    return tareaActualizada;
  } catch (error) {
    console.error("❌ Error en updateTareaController:", error);
  }
};

// 🔹 Eliminar una tarea por ID
export const deleteTareaController = async (idTareaAEliminar: string) => {
  try {
    await axios.delete(`${API_URL}/${idTareaAEliminar}`);
  } catch (error) {
    console.error("❌ Error en deleteTareaController:", error);
  }
};
