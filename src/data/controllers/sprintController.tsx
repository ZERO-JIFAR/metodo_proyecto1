import axios from "axios";
import { ISprint } from "../../types/ISprint";
import { ITareaSprint } from "../../types/ITareaSprint";

// 🔹 Obtener la URL base del archivo .env
const API_BASE_URL = import.meta.env.VITE_API_URL;

// 🔹 Obtener todos los sprints
// Obtener todos los sprints
export const getSprintsController = async (): Promise<ISprint[] | undefined> => {
  try {
    const response = await axios.get<ISprint[]>(`${API_BASE_URL}/Sprints`);
    return response.data;
  } catch (error) {
    console.error("❌ Error en getSprintsController:", error);
  }
};

// 🔹 Crear un nuevo sprint (agrega a Sprints)
// Crear un nuevo sprint
export const createSprintController = async (sprint: ISprint): Promise<ISprint | undefined> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Sprints`, sprint);
    return response.data;
  } catch (error) {
    console.error("❌ Error en createSprintController:", error);
  }
};

export const deleteSprintController = async (id: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/Sprints/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error eliminando sprint:", error);
    throw error;
  }
};
export const updateSprintController = async (sprint: ISprint) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/Sprints/${sprint.id}`, sprint); // Usamos sprint.id directamente
    return response.data;
  } catch (error) {
    console.error("Error actualizando sprint:", error);
    throw error;
  }
};


export const addTareaToSprintController = async (
  idSprint: string,
  nuevaTarea: ITareaSprint
): Promise<void> => {
  try {
    const response = await axios.get<ISprint[]>(`${API_BASE_URL}/Sprints`);
    const sprints = response.data;

    const sprint = sprints.find((s) => s.id === idSprint);
    if (!sprint) throw new Error("Sprint no encontrado");

    const sprintActualizado = {
      ...sprint,
      tareas: [...sprint.tareas, nuevaTarea],
    };

    await axios.put(`${API_BASE_URL}/Sprints/${idSprint}`, sprintActualizado);
  } catch (error) {
    console.error("❌ Error en addTareaToSprintController:", error);
    throw error;
  }
};

// 🔹 Mover una tarea de un sprint al backlog
export const moverTareaABacklogController = async (
  idSprint: string,
  tareaId: string
): Promise<void> => {
  try {
    const sprints = await getSprintsController();
    if (!sprints) throw new Error("No se pudieron obtener los sprints");

    const sprint = sprints.find(s => s.id === idSprint);
    if (!sprint) throw new Error("Sprint no encontrado");

    const tarea = sprint.tareas.find(t => t.id === tareaId);
    if (!tarea) throw new Error("Tarea no encontrada");

    // Obtener tareas actuales del backlog
    const responseBacklog = await axios.get(`${API_BASE_URL}/Backlog`);
    const tareasBacklog = responseBacklog.data.Backlog || [];

    // Crear la nueva tarea para el backlog
    const nuevaTareaBacklog = {
      id: tarea.id,
      nombre: tarea.titulo,
      descripcion: tarea.descripcion,
      fechaInicio: new Date().toISOString().split("T")[0],
      fechaFin: tarea.fechaLimite || new Date().toISOString().split("T")[0]
    };

    // Agregar la tarea al backlog
    await axios.put(`${API_BASE_URL}/Backlog`, {
      Backlog: [...tareasBacklog, nuevaTareaBacklog]
    });

    // Eliminar la tarea del sprint
    const sprintActualizado: ISprint = {
      ...sprint,
      tareas: sprint.tareas.filter(t => t.id !== tareaId)
    };

    const nuevaListaSprints = sprints.map(s =>
      s.id === idSprint ? sprintActualizado : s
    );

    await axios.put(`${API_BASE_URL}/Sprints`, nuevaListaSprints);

  } catch (error) {
    console.error("❌ Error en moverTareaABacklogController:", error);
  }
};

// 🔹 Crear nueva tarea en un Sprint
export const createTareaSprint = async (
  idSprint: string,
  tareaNueva: { titulo: string; descripcion: string; fechaLimite?: string }
) => {
  try {
    const response = await axios.get<{ Sprints: ISprint[] }>(`${API_BASE_URL}/Sprints`);
    const sprints = response.data.Sprints;

    const sprint = sprints.find(s => s.id === idSprint);
    if (!sprint) throw new Error("Sprint no encontrado");

    const nuevaTarea = {
      id: (sprint.tareas.length + 1).toString(),
      titulo: tareaNueva.titulo,
      descripcion: tareaNueva.descripcion,
      fechaLimite: tareaNueva.fechaLimite || new Date().toISOString().split("T")[0],
      estado: "pendiente"
    };

    const sprintActualizado = {
      ...sprint,
      tareas: [...sprint.tareas, nuevaTarea]
    };

    const nuevosSprints = sprints.map(s => s.id === idSprint ? sprintActualizado : s);
    await axios.put(`${API_BASE_URL}/Sprints`, nuevosSprints);

    return nuevaTarea;
  } catch (error) {
    console.error("❌ Error en createTareaSprint:", error);
  }
};
