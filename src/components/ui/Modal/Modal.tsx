import { FC, useEffect } from "react";
import { useTareasStore } from "../../../store/tareaStore";
import styles from "./Modal.module.css";
import { ITarea } from "../../../types/ITarea";
import { useTareas } from "../../../hooks/useTareas";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type IModal = {
  handleCloseModal: VoidFunction;
};

const schema = yup.object({
  titulo: yup.string().required("El título es obligatorio").min(3, "Mínimo 3 caracteres"),
  fechaInicio: yup.string().required("La fecha de inicio es obligatoria"),
  fechaLimite: yup.string().required("La fecha límite es obligatoria"),
  descripcion: yup.string().max(500, "Máximo 500 caracteres"),
});

export const Modal: FC<IModal> = ({ handleCloseModal }) => {
  const tareaActiva = useTareasStore((state) => state.tareaActiva);
  const setTareaActiva = useTareasStore((state) => state.setTareaActiva);

  const { crearTarea, putTareaEditar } = useTareas();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<ITarea>({

    //ERROR PORQUE está esperando que los valores del formulario coincidan exactamente con la interfaz ITarea
    resolver: yupResolver(schema),
    defaultValues: {
      titulo: "",
      fechaInicio: "",
      fechaLimite: "",
      descripcion: "",
      tipo: "activa",
    },
  });

  useEffect(() => {
    if (tareaActiva && tareaActiva.tipo === "activa") {
      setValue("titulo", tareaActiva.titulo);
      setValue("fechaInicio", tareaActiva.fechaInicio);
      setValue("fechaLimite", tareaActiva.fechaLimite);
      setValue("descripcion", tareaActiva.descripcion);
    } else {
      reset();
    }
  }, [tareaActiva, setValue, reset]);

  const onSubmit = (data: ITarea) => {
    if (tareaActiva && tareaActiva.tipo === "activa") {
      putTareaEditar({ ...tareaActiva, ...data });
    } else {
      crearTarea({
        ...data,
        id: new Date().getTime().toString(),
        tipo: "activa",
      });
    }

    setTareaActiva(null);
    reset();
    handleCloseModal();
  };

  const handleCancel = () => {
    setTareaActiva(null);
    reset(); // limpia campos y errores
    handleCloseModal();
  };

  return (
    <div className={styles.containerPrincipalModal}>
      <div className={styles.contentPopUp}>
        <h3>{tareaActiva ? "Editar tarea" : "Crear tarea"}</h3>
        //ERROR POR LO MISMO DE ARRIBA, ANDA IGUAL
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formContent}>
          <input
            placeholder="Ingrese un título"
            type="text"
            {...register("titulo")}
            autoComplete="off"
          />
          {errors.titulo && <p className={styles.modalError}>{errors.titulo.message}</p>}

          <input
            type="date"
            {...register("fechaInicio")}
            autoComplete="off"
          />
          {errors.fechaInicio && <p className={styles.modalError}>{errors.fechaInicio.message}</p>}

          <input
            type="date"
            {...register("fechaLimite")}
            autoComplete="off"
          />
          {errors.fechaLimite && <p className={styles.modalError}>{errors.fechaLimite.message}</p>}

          <textarea
            placeholder="Descripción (opcional)"
            {...register("descripcion")}
            autoComplete="off"
          />
          {errors.descripcion && <p className={styles.modalError}>{errors.descripcion.message}</p>}

          <div className={styles.buttonCard}>
            <button type="button" onClick={handleCancel}>Cancelar</button>
            <button type="submit">
              {tareaActiva ? "Editar tarea" : "Crear tarea"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
