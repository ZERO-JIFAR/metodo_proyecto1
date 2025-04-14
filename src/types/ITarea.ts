export interface ITarea {
  id: string;
  titulo: string;
  estado: EstadoTarea;
  descripcion: string;
  fechaInicio: string;
  fechaLimite: string;
  tipo: 'activa' | 'backlog';
}
export type EstadoTarea = "pendiente" | "en-progreso" | "completado"