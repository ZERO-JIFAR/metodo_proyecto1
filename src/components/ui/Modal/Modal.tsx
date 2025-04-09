import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { tareaStore } from "../../../store/tareaStore";
import styles from "./Modal.module.css";
import { ITarea } from "../../../types/ITarea";
import { useTareas } from "../../../hooks/useTareas";

type IModal = {
    handleCloseModal: VoidFunction
}

const initialState: ITarea = {
    titulo: "",
    fechaInicio: "",
    fechaLimite: "",
}

export const Modal: FC<IModal> = ({ handleCloseModal }) => {
    const tareaActiva = tareaStore((state) => state.tareaActiva);
    const setTareaActiva = tareaStore((state) => state.setTareaActiva);

    const { crearTarea, putTareaEditar } = useTareas();

    const [formValues, setFormValues] = useState<ITarea>(initialState);

    useEffect(() => {
        if (tareaActiva) setFormValues(tareaActiva);
    }, [tareaActiva]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (tareaActiva) {
            putTareaEditar(formValues);
        } else {
            crearTarea({ ...formValues, id: new Date().toDateString() });
        }
        setTareaActiva(null);
        handleCloseModal();
    };

    return (
        <div className={styles.containerPrincipalModal}>
            <div className={styles.contentPopUp}>
                <h3>{tareaActiva ? "Editar tarea" : "Crear tarea"}</h3>
                <form onSubmit={handleSubmit} className={styles.formContent}>
                    <input 
                        placeholder="Ingrese un título" 
                        type="text" 
                        required 
                        onChange={handleChange}
                        value={formValues.titulo}
                        autoComplete="off" 
                        name="titulo"
                    />
                    <input 
                        type="date" 
                        value={formValues.fechaInicio}
                        required 
                        onChange={handleChange}
                        autoComplete="off" 
                        name="fechaInicio"
                    />
                    <input 
                        type="date" 
                        value={formValues.fechaLimite}
                        required 
                        onChange={handleChange}
                        autoComplete="off" 
                        name="fechaLimite"
                    />
                    <div className={styles.buttonCard}>
                        <button type="button" onClick={handleCloseModal}>Cancelar</button>
                        <button type="submit">
                            {tareaActiva ? "Editar tarea" : "Crear tarea"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
