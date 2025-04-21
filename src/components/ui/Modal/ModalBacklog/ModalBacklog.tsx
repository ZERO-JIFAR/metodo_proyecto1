import React, { useEffect } from 'react';
import styles from './ModalBacklog.module.css';
import { useTareasStore } from "../../../../store/tareaStore";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  titulo: string;
  descripcion: string;
}

// Validación con Yup
const schema = yup.object({
  titulo: yup.string().required("El título es obligatorio").min(3, "Mínimo 3 caracteres"),
  descripcion: yup.string().required("La descripción es obligatoria").min(5, "Mínimo 5 caracteres"),
});

const ModalBacklog: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { agregarTarea, actualizarTarea, tareaActiva, setTareaActiva } = useTareasStore();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (tareaActiva && tareaActiva.tipo === "backlog") {
      setValue("titulo", tareaActiva.titulo);
      setValue("descripcion", tareaActiva.descripcion);
    } else {
      reset();
    }
  }, [tareaActiva, setValue, reset]);

  const onSubmit = async (data: FormData) => {
    if (tareaActiva && tareaActiva.tipo === "backlog") {
      await actualizarTarea({ ...tareaActiva, ...data });
    } else {
      await agregarTarea({
        id: new Date().getTime().toString(),
        titulo: data.titulo,
        descripcion: data.descripcion,
        fechaInicio: "",
        fechaLimite: "",
        tipo: "backlog",
      });
    }

    setTareaActiva(null);
    reset(); // limpia campos y errores
    onClose();
  };

  const handleClose = () => {
    setTareaActiva(null);
    reset(); // limpia errores y valores
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalBacklog}>
      <div className={styles.modalContentBacklog}>
        <h2 className={styles.modalTitleBacklog}>
          {tareaActiva && tareaActiva.tipo === "backlog" ? "Editar Tarea" : "Crear Tarea de Backlog"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className={styles.modalInputBacklog}
            type="text"
            placeholder="Título"
            {...register("titulo")}
          />
          {errors.titulo && <p className={styles.modalError}>{errors.titulo.message}</p>}

          <textarea
            className={styles.modalTextareaBacklog}
            placeholder="Descripción"
            {...register("descripcion")}
          />
          {errors.descripcion && <p className={styles.modalError}>{errors.descripcion.message}</p>}

          <div className={styles.modalButtonGroup}>
            <button
              type="button"
              onClick={handleClose}
              className={styles.modalCancelButtonBacklog}
            >
              Cancelar
            </button>
            <button type="submit" className={styles.modalButtonBacklog}>
              {tareaActiva && tareaActiva.tipo === "backlog" ? "Guardar Cambios" : "Crear Tarea"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalBacklog;
