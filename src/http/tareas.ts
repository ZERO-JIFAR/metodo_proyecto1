import axios from "axios";
import { ITarea } from "../types/ITarea";

const API_URL = "http://localhost:3000"; // Asegúrate de que este sea el endpoint correcto

// Obtener el backlog
export const getBacklog = async () => {
  try {
    const response = await axios.get(`${API_URL}/backlog`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el backlog:", (error as any).message);
    throw error; // Lanza el error para manejarlo en el lugar donde se llama
  }
};

// Obtener la lista de sprints
export const getSprintList = async () => {
  try {
    const response = await axios.get(`${API_URL}/sprintList`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener la lista de sprints:", (error as any).message);
    throw error; // Lanza el error para manejarlo en el lugar donde se llama
  }
};

// Actualizar el backlog
export const updateBacklog = async (backlog: { tareas: ITarea[] }) => {
  try {
    const response = await axios.put(`${API_URL}/backlog`, backlog);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el backlog:", (error as any).message);
    throw error; // Lanza el error para manejarlo en el lugar donde se llama
  }
};

// Actualizar la lista de sprints
export const updateSprintList = async (sprintList: { sprints: any[] }) => {
  try {
    const response = await axios.put(`${API_URL}/sprintList`, sprintList);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la lista de sprints:", (error as any).message);
    throw error; // Lanza el error para manejarlo en el lugar donde se llama
  }
};