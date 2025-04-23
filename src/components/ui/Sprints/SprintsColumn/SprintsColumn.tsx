import { useTareasStore } from "../../../../store/tareaStore"
import { SprintsCard } from "../SprintsCard/SprintsCard"

interface Props {
    estado: "pendiente" | "en-progreso" | "completado"
    titulo: string
}

export const SprintColumn = ({ estado, titulo }: Props) => {    
    const tareas = useTareasStore((state) => state.tareas)

    return (
        <div className="columnContainer">
            <p>{titulo}</p>
            {tareas.filter((el) => el.estado === "pendiente")
            .map((tarea) => (
                <SprintsCard tarea={tarea} />
            ))}
        </div>
    )
}