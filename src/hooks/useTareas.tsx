import { useShallow } from "zustand/shallow";
import { useTareasStore } from "../store/tareaStore";
import { ITarea } from "../types/ITarea";
import {
  editarTarea,
  eliminarTareaPorID,
  getAllTareas,
  postNuevaTarea
} from "../http/tareas";
import Swal from "sweetalert2";

export const useTareas = () => {
  const {
    tareas,
    cargarTareas,
    agregarTarea,
    eliminarTarea,
    actualizarTarea,
  } = useTareasStore(
    useShallow((state) => ({
      tareas: state.tareas,
      cargarTareas: state.cargarTareas,
      agregarTarea: state.agregarTarea,
      eliminarTarea: state.eliminarTarea,
      actualizarTarea: state.actualizarTarea,
    }))
  );

  const getTareas = async () => {
    await cargarTareas();
  };

  const crearTarea = async (nuevaTarea: ITarea) => {
    try {
      await postNuevaTarea(nuevaTarea);
      await cargarTareas();
      Swal.fire("Éxito", "Tarea creada correctamente", "success");
    } catch (error) {
      console.error("Error al crear la tarea", error);
      Swal.fire("Error", "Hubo un problema al crear la tarea", "error");
    }
  };

  const putTareaEditar = async (tareaEditada: ITarea) => {
    const estadoPrevio = tareas.find((t) => t.id === tareaEditada.id);
    try {
      await editarTarea(tareaEditada);
      await cargarTareas();
      Swal.fire("Éxito", "Tarea actualizada correctamente", "success");
    } catch (error) {
      console.error("Error al editar la tarea", error);
      Swal.fire("Error", "No se pudo editar la tarea", "error");
      if (estadoPrevio) await actualizarTarea(estadoPrevio); // rollback
    }
  };

  const eliminarTareaConConfirmacion = async (idTarea: string) => {
    const estadoPrevio = tareas.find((t) => t.id === idTarea);

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
      await eliminarTareaPorID(idTarea);
      await cargarTareas();
      Swal.fire("Eliminado", "Tarea eliminada correctamente", "success");
    } catch (error) {
      console.error("Error al eliminar la tarea", error);
      Swal.fire("Error", "No se pudo eliminar la tarea", "error");
      if (estadoPrevio) await agregarTarea(estadoPrevio); // rollback
    }
  };

  return {
    getTareas,
    crearTarea,
    putTareaEditar,
    eliminarTarea: eliminarTareaConConfirmacion,
    tareas,
  };
};
