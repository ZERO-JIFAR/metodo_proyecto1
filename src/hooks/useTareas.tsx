import { useShallow } from "zustand/shallow";
import { useTareasStore } from "../store/tareaStore";
import { ITarea } from "../types/ITarea";
import Swal from "sweetalert2";

export const useTareas = () => {
  const {
    backlog,
    sprintList,
    cargarDatos,
    agregarTareaBacklog,
    actualizarTarea,
    eliminarTarea,
    moverTareaASprint,
  } = useTareasStore(
    useShallow((state) => ({
      backlog: state.backlog,
      sprintList: state.sprintList,
      cargarDatos: state.cargarDatos,
      agregarTareaBacklog: state.agregarTareaBacklog,
      actualizarTarea: state.actualizarTarea,
      eliminarTarea: state.eliminarTarea,
      moverTareaASprint: state.moverTareaASprint,
    }))
  );

  const getTareas = async () => {
    await cargarDatos();
  };

  const crearTarea = async (nuevaTarea: ITarea) => {
    try {
      await agregarTareaBacklog(nuevaTarea);
      Swal.fire("Éxito", "Tarea creada correctamente en el backlog", "success");
    } catch (error) {
      console.error("Error al crear la tarea", error);
      Swal.fire("Error", "Hubo un problema al crear la tarea", "error");
    }
  };

  const putTareaEditar = async (tareaEditada: ITarea, sprintId?: string) => {
    try {
      await actualizarTarea(tareaEditada, sprintId);
      Swal.fire("Éxito", "Tarea actualizada correctamente", "success");
    } catch (error) {
      console.error("Error al editar la tarea", error);
      Swal.fire("Error", "No se pudo editar la tarea", "error");
    }
  };

  const eliminarTareaConConfirmacion = async (idTarea: string, sprintId?: string) => {
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    try {
      await eliminarTarea(idTarea, sprintId);
      Swal.fire("Eliminado", "Tarea eliminada correctamente", "success");
    } catch (error) {
      console.error("Error al eliminar la tarea", error);
      Swal.fire("Error", "No se pudo eliminar la tarea", "error");
    }
  };

  const moverTarea = async (tareaId: string, sprintId: string) => {
    try {
      await moverTareaASprint(tareaId, sprintId);
      Swal.fire("Éxito", "Tarea movida al sprint correctamente", "success");
    } catch (error) {
      console.error("Error al mover la tarea al sprint", error);
      Swal.fire("Error", "No se pudo mover la tarea al sprint", "error");
    }
  };

  return {
    getTareas,
    crearTarea,
    putTareaEditar,
    eliminarTarea: eliminarTareaConConfirmacion,
    moverTarea,
    backlog,
    sprintList,
  };
};