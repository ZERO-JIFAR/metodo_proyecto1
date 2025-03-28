import { FC } from "react";
import { ITarea } from "../../../types/ITarea"
import styles from "./CardList.module.css"
import { useTareas } from "../../../hooks/useTareas";

type ICardList = {
    tarea: ITarea;
    handleOpenModalEdit:(tarea: ITarea)=> void 
};

export const CardList: FC<ICardList> = ({tarea, handleOpenModalEdit}) => {
    const {eliminarTarea} = useTareas(); 
    const eliminarTareaById = () => {
        eliminarTarea(tarea.id!)
    }
    const editarTarea = () => {
        handleOpenModalEdit(tarea)
    }

    return (
        <div className={styles.containerCard}>
            <div>
                <h3>Titulo: {tarea.titulo}</h3>
                <p>
                    <b>Inicio: {tarea.fechaInicio}</b>
                </p>
                <p>
                    <b>Cierre: {tarea.fechaLimite}</b>
                </p>
            </div>
            <div className={styles.actionCard}>
                <button onClick={editarTarea} className={styles.botonEditar}>🔍</button>
                <button onClick={editarTarea} className={styles.botonEditar}>🖍</button>
                <button onClick={eliminarTareaById} className={styles.botonEliminar}>🗑</button>
            </div>
        </div>
    );
};
