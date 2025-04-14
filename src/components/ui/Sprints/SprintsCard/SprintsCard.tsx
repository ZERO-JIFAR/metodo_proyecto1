import { useTareasStore } from "../../../../store/tareaStore"
import { EstadoTarea, ITarea } from "../../../../types/ITarea"

interface Props {
    tarea: ITarea;
}

export const SprintsCard = ({ tarea }: Props) => {
    const moverTarea = useTareasStore((state) => state.moverEstadoTarea)

    const avanzar = () => {
        const siguiente: Record<EstadoTarea, EstadoTarea | null> = {
            "pendiente": "en-progreso",
            "en-progreso": "completado",
            "completado": null,
        }

        const nuevoEstado = siguiente[tarea.estado]
        if (nuevoEstado) moverTarea(tarea.id, nuevoEstado)
    }

    const retroceder = () => {
        const anterior: Record<EstadoTarea, EstadoTarea | null> = {
            "pendiente": null,
            "en-progreso": "pendiente",
            "completado": "en-progreso",
        }

        const nuevoEstado = anterior[tarea.estado]
        if (nuevoEstado) moverTarea(tarea.id, nuevoEstado)
    }

    return (
        <div className="card">
            <p>{tarea.titulo}</p>
            <p><em>{tarea.fechaInicio}</em></p>

            <div style={{ display: "flex", gap: "0.5rem" }}>
                <button onClick={retroceder} disabled={tarea.estado === "pendiente"}>←</button>
                <button onClick={avanzar} disabled={tarea.estado === "completado"}>→</button>
            </div>
        </div>
    )
}