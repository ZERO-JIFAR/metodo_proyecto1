import { create } from 'zustand';
import { EstadoTarea, ITarea } from '../types/ITarea';
import {
  getAllTareas,
  postNuevaTarea,
  editarTarea,
  eliminarTareaPorID
} from '../http/tareas';

interface TareasState {
  tareas: ITarea[];
  tareaActiva: ITarea | null;
  moverEstadoTarea: (id: string, nuevoEstado: EstadoTarea) => void
  cargarTareas: () => Promise<void>;
  agregarTarea: (tarea: ITarea) => Promise<void>;
  actualizarTarea: (tarea: ITarea) => Promise<void>;
  eliminarTarea: (id: string) => Promise<void>;
  setTareaActiva: (tarea: ITarea | null) => void;
}

export const useTareasStore = create<TareasState>((set) => ({
  tareas: [],
  tareaActiva: null,

  cargarTareas: async () => {
    const data = await getAllTareas();
    set({ tareas: data ?? [] });
  },

  agregarTarea: async (tarea: ITarea) => {
    try {
      await postNuevaTarea(tarea);
      const data = await getAllTareas();
      set({ tareas: data ?? [] });
    } catch (error) {
      console.error("Error al agregar tarea:", error);
    }
  },

  actualizarTarea: async (tarea: ITarea) => {
    try {
      await editarTarea(tarea);
      const data = await getAllTareas();
      set({ tareas: data ?? [] });
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  },

  eliminarTarea: async (id: string) => {
    try {
      await eliminarTareaPorID(id);
      const data = await getAllTareas();
      set({ tareas: data ?? [] });
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  },

  setTareaActiva: (tarea: ITarea | null) => set({ tareaActiva: tarea }),
  
  moverEstadoTarea: (id, nuevoEstado) =>
        set((state) => ({
            tareas: state.tareas.map((t) => (t.id === id ? { ...t, estado: nuevoEstado } : t)),
        })),
}));
