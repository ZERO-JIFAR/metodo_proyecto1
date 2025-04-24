import axios from "axios";
import { ITareaBacklog } from "../types/ITareaBacklog";

// ✅ Traer la URL desde el archivo .env usando Vite
const API_URL = import.meta.env.VITE_API_URL;

// 🔄 Función para actualizar el objeto global del json server
export const putTareaList = async (proyectos: ITareaBacklog[]) => {
  try {
    const response = await axios.put(API_URL, {
      Tareas: proyectos, // Enviamos los proyectos dentro del objeto "Tareas"
    });

    return response.data;
  } catch (error) {
    console.error("Algo salió mal en putTareaList", error);
  }
};
