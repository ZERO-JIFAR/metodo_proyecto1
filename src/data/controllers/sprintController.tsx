import axios from "axios";
import { ISprint } from "../../types/ISprint";
import { ITareaSprint } from "../../types/ITareaSprint";

// 🔹 Obtener la URL base del archivo .env
const API_BASE_URL = import.meta.env.VITE_API_URL;

// 🔹 Obtener todos los sprints
export const getSprintsController = async (): Promise<ISprint[] | undefined> => {
  try {
    const response = await axios.get<{ sprints: ISprint[] }>(`${API_BASE_URL}/sprintList`);
    return response.data.sprints;
  } catch (error) {
    console.error("❌ Error en getSprintsController:", error);
  }
};

// 🔹 Crear un nuevo sprint
export const createSprintController = async (sprint: ISprint): Promise<ISprint | undefined> => {
  try {
    const response = await axios.get<{ sprints: ISprint[] }>(`${API_BASE_URL}/sprintList`);
    const sprintsActuales = response.data.sprints;

    const nuevosSprints = [...sprintsActuales, sprint];
    await axios.put(`${API_BASE_URL}/sprintList`, { sprints: nuevosSprints });

    return sprint;
  } catch (error) {
    console.error("❌ Error en createSprintController:", error);
  }
};

// 🔹 Eliminar un sprint
export const deleteSprintController = async (id: string) => {
  try {
    const response = await axios.get<{ sprints: ISprint[] }>(`${API_BASE_URL}/sprintList`);
    const sprintsActuales = response.data.sprints;

    const sprintsFiltrados = sprintsActuales.filter(sprint => sprint.id !== id);
    await axios.put(`${API_BASE_URL}/sprintList`, { sprints: sprintsFiltrados });

  } catch (error) {
    console.error("❌ Error eliminando sprint:", error);
    throw error;
  }
};

// 🔹 Actualizar un sprint
export const updateSprintController = async (sprint: ISprint) => {
  try {
    const response = await axios.get<{ sprints: ISprint[] }>(`${API_BASE_URL}/sprintList`);
    const sprintsActuales = response.data.sprints;

    const sprintsActualizados = sprintsActuales.map(s =>
      s.id === sprint.id ? sprint : s
    );

    await axios.put(`${API_BASE_URL}/sprintList`, { sprints: sprintsActualizados });

    return sprint;
  } catch (error) {
    console.error("❌ Error actualizando sprint:", error);
    throw error;
  }
};

// 🔹 Agregar tarea a un sprint
export const addTareaToSprintController = async (
  idSprint: string,
  nuevaTarea: ITareaSprint
): Promise<void> => {
  try {
    const response = await axios.get<{ sprints: ISprint[] }>(`${API_BASE_URL}/sprintList`);
    const sprints = response.data.sprints;

    const sprint = sprints.find(s => s.id === idSprint);
    if (!sprint) throw new Error("Sprint no encontrado");

    const sprintActualizado: ISprint = {
      ...sprint,
      tareas: [...sprint.tareas, nuevaTarea]
    };

    const nuevosSprints = sprints.map(s => s.id === idSprint ? sprintActualizado : s);
    await axios.put(`${API_BASE_URL}/sprintList`, { sprints: nuevosSprints });

  } catch (error) {
    console.error("❌ Error en addTareaToSprintController:", error);
    throw error;
  }
};

// 🔹 Mover una tarea de sprint al backlog
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

    // Obtener backlog actual
    const responseBacklog = await axios.get<{ tareas: any[] }>(`${API_BASE_URL}/backlog`);
    const tareasBacklog = responseBacklog.data.tareas;

    // Nueva tarea para backlog
    const nuevaTareaBacklog = {
      id: tarea.id,
      nombre: tarea.titulo,
      descripcion: tarea.descripcion,
      fechaInicio: new Date().toISOString().split("T")[0],
      fechaFin: tarea.fechaLimite || new Date().toISOString().split("T")[0]
    };

    // Agregar la tarea al backlog
    await axios.put(`${API_BASE_URL}/backlog`, {
      tareas: [...tareasBacklog, nuevaTareaBacklog]
    });

    // Eliminar la tarea del sprint
    const sprintActualizado: ISprint = {
      ...sprint,
      tareas: sprint.tareas.filter(t => t.id !== tareaId)
    };

    const nuevosSprints = sprints.map(s =>
      s.id === idSprint ? sprintActualizado : s
    );

    await axios.put(`${API_BASE_URL}/sprintList`, { sprints: nuevosSprints });

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
    const response = await axios.get<{ sprints: ISprint[] }>(`${API_BASE_URL}/sprintList`);
    const sprints = response.data.sprints;

    const sprint = sprints.find(s => s.id === idSprint);
    if (!sprint) throw new Error("Sprint no encontrado");

    const nuevaTarea: ITareaSprint = {
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
    await axios.put(`${API_BASE_URL}/sprintList`, { sprints: nuevosSprints });

    return nuevaTarea;
  } catch (error) {
    console.error("❌ Error en createTareaSprint:", error);
  }
};
