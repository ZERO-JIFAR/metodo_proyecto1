import { useEffect, useState } from "react";
import { tareaStore } from "../../../store/tareaStore";
import styles from "./ListTareas.module.css";
import { CardList } from "../CardList/CardList";
import { Modal } from "../Modal/Modal";
import { ITarea } from "../../../types/ITarea";
import { useTareas } from "../../../hooks/useTareas";

export const ListTareas = () => {
    const setTareaActiva = tareaStore((state) => state.setTareaActiva);

    const { getTareas, tareas } = useTareas();

    useEffect(() => {
        getTareas();
    }, []);

    const [openModalTarea, setOpenModalTarea] = useState(false);

    const handleOpenModalEdit = (tarea: ITarea) => {
        setTareaActiva(tarea);
        setOpenModalTarea(true);
    };

    const handleCloseModal = () => {
        setOpenModalTarea(false);
    };

    return (
        <>
            <div className={styles.containerPrincipalListTareas}>
                <div className={styles.containerTitleAndButton}>
                    <h3><u>Lista de Sprints</u></h3>
                    <button
                        onClick={() => {
                            setOpenModalTarea(true);
                        }}
                        className={styles.botonAgregar}
                    >
                        📝
                    </button>
                </div>
                <div className={styles.containerList}>
                    {tareas.length > 0 ? (
                        tareas.map((el) => (
                            <CardList
                                key={el.id}
                                handleOpenModalEdit={handleOpenModalEdit}
                                tarea={el}
                            />
                        ))
                    ) : (
                        <div>
                            <h2>No hay Tareas</h2>
                        </div>
                    )}
                </div>
            </div>
            {openModalTarea && <Modal handleCloseModal={handleCloseModal} />}
        </>
    );
};
