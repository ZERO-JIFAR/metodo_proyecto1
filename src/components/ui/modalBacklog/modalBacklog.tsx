import { useState, useEffect } from "react";
import { ITareaBacklog } from "../../../types/ITareaBacklog";
import {
  createTareaController,
  getTareasController,
  updateTareaController,
} from "../../../data/controllers/backlogController";
import styles from "./modalBacklog.module.css";
import Swal from "sweetalert2";
import { createTareaSprint } from "../../../data/controllers/sprintController";
import {tareaYup} from "../../../validation/yup"

type TareaModalProps = {
  closeModal: () => void;
  refreshTareas: () => void;
  tarea?: ITareaBacklog;
  idSprint?: string;
  esBacklog?: boolean;
};

const TareaModal = ({
  closeModal,
  refreshTareas,
  tarea,
  idSprint,
  esBacklog,
}: TareaModalProps) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [errores, setErrores] = useState({
    nombre: "",
    descripcion: "",
    fechas: "",
  });


  useEffect(() => {
    if (tarea) {
      setNombre(tarea.nombre);
      setDescripcion(tarea.descripcion);
      setFechaInicio(tarea.fechaInicio);
      setFechaFin(tarea.fechaFin);
    }
  }, [tarea]);

  useEffect(() => {
    const nuevosErrores = {
      nombre: "",
      descripcion: "",
      fechas: "",
    };

    if (nombre && nombre.trim().length < 3)
      nuevosErrores.nombre = "El nombre debe tener al menos 3 caracteres.";
    if (descripcion && descripcion.trim().length < 3)
      nuevosErrores.descripcion = "La descripción debe tener al menos 3 caracteres.";
    if (fechaInicio && fechaFin && new Date(fechaInicio) > new Date(fechaFin))
      nuevosErrores.fechas = "La fecha de inicio no puede ser posterior a la de fin.";

    setErrores(nuevosErrores);
  }, [nombre, descripcion, fechaInicio, fechaFin]);

  const validarCampos = () => {
    if (!nombre || !descripcion || !fechaInicio || !fechaFin) {
      Swal.fire("Campos incompletos", "Por favor completa todos los campos", "warning");
      return false;
    }
    if (nombre.trim().length < 3 || descripcion.trim().length < 3) {
      Swal.fire("Texto muy corto", "El nombre y la descripción deben tener al menos 3 caracteres.", "warning");
      return false;
    }
    if (new Date(fechaInicio) > new Date(fechaFin)) {
      Swal.fire("Fechas inválidas", "La fecha de inicio no puede ser posterior a la fecha de fin.", "warning");
      return false;
    }
    return true;
  };

  const handleCreateTareaBacklog = async () => {
    if (!validarCampos()) return;

    const nuevaTarea: ITareaBacklog = {
      id: Date.now().toString(), // usar timestamp como ID
      nombre,
      descripcion,
      fechaInicio,
      fechaFin,
    };

    if (tarea) {
      await updateTareaController({ ...nuevaTarea, id: tarea.id });
    } else {
      await createTareaController(nuevaTarea);
    }

    refreshTareas();
    closeModal();
  };

  const handleCreateTareaSprint = async () => {
    if (!validarCampos() || !idSprint) return;

    const tareaNueva = {
      titulo: nombre,
      descripcion,
      fechaLimite: fechaFin,
    };

    await createTareaSprint(idSprint, tareaNueva);
    refreshTareas();
    closeModal();
  };

  return (
    <div className={styles.modalBacklog}>
      <div className={styles.modalContentBacklog}>
        <h2 className={styles.modalTitleBacklog}>
          {tarea ? "Editar Tarea" : "Nueva Tarea"}
        </h2>

        <input
          type="text"
          className={styles.modalInputBacklog}
          placeholder="Nombre de la tarea"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        {errores.nombre && <p className={styles.modalError}>{errores.nombre}</p>}

        <textarea
          className={styles.modalTextareaBacklog}
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        {errores.descripcion && (
          <p className={styles.modalError}>{errores.descripcion}</p>
        )}

        <input
          type="date"
          className={styles.modalInputBacklog}
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
        />

        <input
          type="date"
          className={styles.modalInputBacklog}
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
        />
        {errores.fechas && <p className={styles.modalError}>{errores.fechas}</p>}

        <div className={styles.modalButtonGroup}>
          <button
            className={styles.modalCancelButtonBacklog}
            onClick={closeModal}
          >
            Cancelar
          </button>
          <button
            className={styles.modalButtonBacklog}
            onClick={esBacklog ? handleCreateTareaBacklog : handleCreateTareaSprint}
          >
            {tarea ? "Guardar Cambios" : "Crear Tarea"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TareaModal;