import { useEffect, useState } from "react";
import { useTareasStore } from "../../../store/tareaStore";
import styles from "./ListTareas.module.css";
import { CardList } from "../CardList/CardList";
import { Modal } from "../Modal/Modal";
import { ITarea } from "../../../types/ITarea";
import { useTareas } from "../../../hooks/useTareas";
import { IoMdAddCircle } from "react-icons/io";

export const ListTareas = () => {
    const setTareaActiva = useTareasStore((state) => state.setTareaActiva);
    const { getTareas, tareas } = useTareas();

    const [openModalTarea, setOpenModalTarea] = useState(false);

    useEffect(() => {
        getTareas();
    }, []);

    const tareasActivas = tareas.filter((t: ITarea) => t.tipo === "activa"); // ✅ solo sprint

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
                <div className={styles.containerList}>
                    <div className={styles.containerTitleAndButton}>
                        <h3><u>Lista de Sprints</u></h3>
                        <button
                            onClick={() => setOpenModalTarea(true)}
                            className={styles.botonAgregar}
                        >
                            <h1><IoMdAddCircle /></h1>
                        </button>
                    </div>
                    {tareasActivas.length > 0 ? (
                        tareasActivas.map((el: ITarea) => (
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
