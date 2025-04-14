export interface ITarea{
    id: string
    titulo: string
    estado: EstadoTarea
    fechaInicio: string
    fechaLimite: string
}

export type EstadoTarea = "pendiente" | "en-progreso" | "completado"