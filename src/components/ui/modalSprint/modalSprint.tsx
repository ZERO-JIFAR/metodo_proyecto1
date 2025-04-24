import { useState, useEffect } from "react";
import { ISprint } from "../../../types/ISprint";
import {
  createSprintController,
  updateSprintController,
} from "../../../data/controllers/sprintController";
import styles from "./modalSprint.module.css";
import Swal from "sweetalert2";
import { sprintYup } from "../../../validation/yup";

type SprintModalProps = {
  closeModal: () => void;
  refreshSprints: () => void;
  editMode: boolean;
  sprint?: ISprint;
};

const SprintModal = ({
  closeModal,
  refreshSprints,
  editMode,
  sprint,
}: SprintModalProps) => {
  const [nombre, setNombre] = useState<string>("");
  const [fechaInicio, setFechaInicio] = useState<string>("");
  const [fechaFin, setFechaFin] = useState<string>("");
  const [errores, setErrores] = useState<any>({});

  useEffect(() => {
    if (editMode && sprint) {
      setNombre(sprint.nombre);
      setFechaInicio(sprint.inicio);
      setFechaFin(sprint.fin);
    }
  }, [editMode, sprint]);

  useEffect(() => {
    validarEnTiempoReal();
  }, [nombre, fechaInicio, fechaFin]);

  const validarEnTiempoReal = async () => {
    try {
      await sprintYup.validate(
        { nombre, inicio: fechaInicio, fin: fechaFin },
        { abortEarly: false }
      );
      setErrores({});
    } catch (err: any) {
      const newErrors: any = {};
      err.inner.forEach((e: any) => {
        newErrors[e.path] = e.message;
      });
      setErrores(newErrors);
    }
  };

  const handleSave = async () => {
    try {
      // Validar manualmente
      await sprintYup.validate(
        { nombre, inicio: fechaInicio, fin: fechaFin },
        { abortEarly: false }
      );

      const nuevoSprint: ISprint = {
        id: sprint?.id || Date.now().toString(),
        nombre,
        inicio: fechaInicio,
        fin: fechaFin,
        tareas: sprint?.tareas || [],
      };

      if (editMode) {
        await updateSprintController(nuevoSprint);
        Swal.fire("Sprint actualizado", "El sprint fue editado correctamente", "success");
      } else {
        await createSprintController(nuevoSprint);
        Swal.fire("Sprint creado", "El nuevo sprint fue creado correctamente", "success");
      }

      refreshSprints();
      closeModal();
    } catch (err: any) {
      if (err.name === "ValidationError") {
        const newErrors: any = {};
        err.inner.forEach((e: any) => {
          newErrors[e.path] = e.message;
        });
        setErrores(newErrors);

        Swal.fire("Errores de validación", "Por favor revisa los campos en rojo", "warning");
      } else {
        console.error("❌ Error inesperado:", err);
        Swal.fire("Error", "Ocurrió un error al guardar el sprint", "error");
      }
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>{editMode ? "Editar Sprint" : "Crear Nuevo Sprint"}</h2>

        <div className={styles.formGroup}>
          <label>Nombre del Sprint:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre del Sprint"
          />
          {errores.nombre && <p className={styles.modalError}>{errores.nombre}</p>}
        </div>

        <div className={styles.formGroup}>
          <label>Fecha de Inicio:</label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
          {errores.inicio && <p className={styles.modalError}>{errores.inicio}</p>}
        </div>

        <div className={styles.formGroup}>
          <label>Fecha de Fin:</label>
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
          {errores.fin && <p className={styles.modalError}>{errores.fin}</p>}
        </div>

        <div className={styles.actions}>
          <button onClick={closeModal} className={styles.cancelButton}>
            Cancelar
          </button>
          <button onClick={handleSave} className={styles.saveButton}>
            {editMode ? "Guardar Cambios" : "Crear Sprint"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SprintModal;
