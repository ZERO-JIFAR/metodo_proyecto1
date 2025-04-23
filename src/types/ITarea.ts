export interface ITarea {
  id: string;
  titulo: string;
  estado: EstadoTarea;
  descripcion: string;
  fechaInicio?: string; // Opcional para tareas en backlog
  fechaLimite: string;
  tipo: "activa" | "backlog"; // Define si la tarea está activa o en backlog
}

export interface ISprint {
  id: string;
  nombre: string;
  fechaInicio: string;
  fechaCierre: string;
  tareas: ITarea[]; // Lista de tareas asociadas al sprint
  tipo: "sprint"; // Define que este objeto es un sprint
}

export type EstadoTarea = "pendiente" | "en-progreso" | "completado";