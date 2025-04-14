export interface ITarea {
  id: string;
  titulo: string;
  descripcion: string;
  fechaInicio: string;
  fechaLimite: string;
  tipo: 'activa' | 'backlog';
}
export type EstadoTarea = "pendiente" | "en-progreso" | "completado"