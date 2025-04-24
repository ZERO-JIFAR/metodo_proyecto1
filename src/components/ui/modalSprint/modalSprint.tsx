import { useState, useEffect } from "react";
import { ISprint } from "../../../types/ISprint";
import {
  createSprintController,
  updateSprintController,
} from "../../../data/controllers/sprintController";
import styles from "./modalSprint.module.css";
import Swal from "sweetalert2";

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

  useEffect(() => {
    if (editMode && sprint) {
      setNombre(sprint.nombre);
      setFechaInicio(sprint.inicio);
      setFechaFin(sprint.fin);
    }
  }, [editMode, sprint]);

  const validarCampos = () => {
    if (!nombre || !fechaInicio || !fechaFin) {
      Swal.fire("Campos incompletos", "Por favor completa todos los campos", "warning");
      return false;
    }
    if (new Date(fechaInicio) > new Date(fechaFin)) {
      Swal.fire("Fechas inválidas", "La fecha de inicio no puede ser posterior a la fecha de fin", "warning");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validarCampos()) return;

    const nuevoSprint: ISprint = {
      id: sprint?.id || Date.now().toString(),
      nombre,
      inicio: fechaInicio,
      fin: fechaFin,
      tareas: sprint?.tareas || [],
    };

    try {
      if (editMode) {
        await updateSprintController(nuevoSprint);
        Swal.fire("Sprint actualizado", "El sprint fue editado correctamente", "success");
      } else {
        await createSprintController(nuevoSprint);
        Swal.fire("Sprint creado", "El nuevo sprint fue creado correctamente", "success");
      }

      refreshSprints();
      closeModal();
    } catch (error) {
      console.error("❌ Error al guardar el sprint:", error);
      Swal.fire("Error", "Ocurrió un error al guardar el sprint", "error");
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
        </div>
        <div className={styles.formGroup}>
          <label>Fecha de Inicio:</label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Fecha de Fin:</label>
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
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