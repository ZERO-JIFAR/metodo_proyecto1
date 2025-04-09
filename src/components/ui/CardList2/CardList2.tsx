import { FC } from "react";
import styles from "./CardList2.module.css"
import { BsFillEyeFill, BsFillTrashFill, BsPencilFill } from "react-icons/bs";
import { useTareas } from "../../../hooks/useTareas";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ITareaDeTareas } from "../../../types/ITareasDeTareas";

type ICardList2 = {
    tarea: ITareaDeTareas;
    handleOpenModalEdit:(tarea: ITareaDeTareas)=> void 
};

export const CardList2: FC<ICardList2> = ({tarea, handleOpenModalEdit}) => {
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
                <h3>{tarea.titulo}</h3>
                <p>
                    <b>{tarea.descripcion}</b>
                </p>
                <p>
                    <b>{tarea.fechaLimite}</b>
                </p>
            </div>

            <div className={styles.actionCard}>
                <button onClick={editarTarea} className={styles.botonEditar}>
                    <BsFillEyeFill />
                </button>
                <button onClick={editarTarea} className={styles.botonEditar}>
                    <BsPencilFill />
                </button>
                <button onClick={eliminarTareaById} className={styles.botonEliminar}>
                    <BsFillTrashFill />
                </button>
            </div>

            <div className={styles.avanzarOvolver}>
                <button onClick={editarTarea} className={styles.volver}>
                        <b><IoIosArrowBack /> Volver</b>
                </button>
                <button onClick={editarTarea} className={styles.avanzar}>
                        <b>Avanzar <IoIosArrowForward /></b>
                </button>
            </div>

        </div>
    );
};
