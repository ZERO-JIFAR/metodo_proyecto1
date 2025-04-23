import { FC } from "react";
import { ITarea } from "../../../types/ITarea";
import styles from "./CardList.module.css";
import { useTareas } from "../../../hooks/useTareas";
import { BsFillEyeFill, BsFillTrashFill, BsPencilFill } from "react-icons/bs";
import { useScreenStore } from "../../../store/screenStateStore";

type ICardList = {
  tarea: ITarea;
  handleOpenModalEdit: (tarea: ITarea) => void;
};

export const CardList: FC<ICardList> = ({ tarea, handleOpenModalEdit }) => {
  const { eliminarTarea } = useTareas();
  const { toggleView } = useScreenStore();

  const eliminarTareaById = async () => {
    try {
      await eliminarTarea(tarea.id!); // Elimina la tarea por ID
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  const editarTarea = () => {
    handleOpenModalEdit(tarea); // Abre el modal para editar la tarea
  };

  return (
    <div className={styles.containerCard}>
      <div>
        <h3>Título: {tarea.titulo}</h3>
        <p>
          <b>Inicio:</b> {tarea.fechaInicio || "No especificado"}
        </p>
        <p>
          <b>Cierre:</b> {tarea.fechaLimite || "No especificado"}
        </p>
      </div>
      <div className={styles.actionCard}>
        <button onClick={toggleView} className={styles.botonVer}>
          <BsFillEyeFill />
        </button>
        <button onClick={editarTarea} className={styles.botonEditar}>
          <BsPencilFill />
        </button>
        <button onClick={eliminarTareaById} className={styles.botonEliminar}>
          <BsFillTrashFill />
        </button>
      </div>
    </div>
  );
};