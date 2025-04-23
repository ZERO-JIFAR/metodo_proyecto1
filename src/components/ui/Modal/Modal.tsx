import { FC, useEffect } from "react";
import { useTareasStore } from "../../../store/tareaStore";
import styles from "./Modal.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ISprint } from "../../../types/ITarea";

type IModal = {
  handleCloseModal: VoidFunction;
};

interface SprintFormData {
  nombre: string;
  fechaInicio: string;
  fechaCierre: string;
}

const schema = yup.object({
  nombre: yup.string().required("El nombre del sprint es obligatorio").min(3, "Mínimo 3 caracteres"),
  fechaInicio: yup.string().required("La fecha de inicio es obligatoria"),
  fechaCierre: yup.string().required("La fecha de cierre es obligatoria"),
});

export const Modal: FC<IModal> = ({ handleCloseModal }) => {
  const sprintActivo = useTareasStore((state) => state.tareaActiva);
  const setTareaActiva = useTareasStore((state) => state.setTareaActiva);
  const { crearSprint, actualizarSprint, cargarDatos } = useTareasStore();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SprintFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      nombre: "",
      fechaInicio: "",
      fechaCierre: "",
    },
  });

  const isSprint = (tarea: any): tarea is ISprint => tarea?.tipo === "sprint";

  useEffect(() => {
    if (isSprint(sprintActivo)) {
      setValue("nombre", sprintActivo.nombre);
      setValue("fechaInicio", sprintActivo.fechaInicio);
      setValue("fechaCierre", sprintActivo.fechaCierre);
    } else {
      reset();
    }
  }, [sprintActivo, setValue, reset]);

  const onSubmit = async (data: SprintFormData) => {
    try {
      if (isSprint(sprintActivo)) {
        await actualizarSprint({ ...sprintActivo, ...data });
      } else {
        await crearSprint({
          ...data,
          id: new Date().getTime().toString(),
          tipo: "sprint",
          tareas: [],
        });
      }

      await cargarDatos();
      setTareaActiva(null);
      reset();
      handleCloseModal();
    } catch (error) {
      console.error("Error al guardar sprint:", error);
    }
  };

  const handleCancel = () => {
    setTareaActiva(null);
    reset();
    handleCloseModal();
  };

  return (
    <div className={styles.containerPrincipalModal}>
      <div className={styles.contentPopUp}>
        <h3>{isSprint(sprintActivo) ? "Editar Sprint" : "Crear Sprint"}</h3>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formContent}>
          <input placeholder="Nombre del Sprint" type="text" {...register("nombre")} autoComplete="off" />
          {errors.nombre && <p className={styles.modalError}>{errors.nombre.message}</p>}

          <input type="date" {...register("fechaInicio")} autoComplete="off" />
          {errors.fechaInicio && <p className={styles.modalError}>{errors.fechaInicio.message}</p>}

          <input type="date" {...register("fechaCierre")} autoComplete="off" />
          {errors.fechaCierre && <p className={styles.modalError}>{errors.fechaCierre.message}</p>}

          <div className={styles.buttonCard}>
            <button type="button" onClick={handleCancel}>Cancelar</button>
            <button type="submit">
              {isSprint(sprintActivo) ? "Editar Sprint" : "Crear Sprint"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
