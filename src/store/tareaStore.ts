import { create } from "zustand";
import { EstadoTarea, ITarea, ISprint } from "../types/ITarea";
import {
  getBacklog,
  getSprintList,
  updateBacklog,
  updateSprintList,
} from "../http/tareas";

interface Backlog {
  tareas: ITarea[];
}

interface SprintList {
  sprints: ISprint[];
}

interface TareasState {
  backlog: Backlog;
  sprintList: SprintList;
  tareaActiva: ITarea | ISprint | null;
  cargarDatos: () => Promise<void>;
  agregarTareaBacklog: (tarea: ITarea) => Promise<void>;
  moverTareaASprint: (tareaId: string, sprintId: string) => Promise<void>;
  actualizarTarea: (tarea: ITarea, sprintId?: string) => Promise<void>;
  actualizarSprint: (sprint: ISprint) => Promise<void>;
  eliminarTarea: (tareaId: string, sprintId?: string) => Promise<void>;
  setTareaActiva: (tarea: ITarea | ISprint | null) => void;
  crearSprint: (nuevoSprint: ISprint) => Promise<void>;
}

export const useTareasStore = create<TareasState>((set) => ({
  backlog: { tareas: [] },
  sprintList: { sprints: [] },
  tareaActiva: null,

  cargarDatos: async () => {
    try {
      const backlogData = await getBacklog();
      const sprintListData = await getSprintList();
      set({
        backlog: backlogData ?? { tareas: [] },
        sprintList: sprintListData ?? { sprints: [] },
      });
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  },

  agregarTareaBacklog: async (tarea: ITarea) => {
    try {
      const updatedBacklog = { ...useTareasStore.getState().backlog };
      updatedBacklog.tareas.push(tarea);
      await updateBacklog(updatedBacklog);
      set({ backlog: updatedBacklog });
    } catch (error) {
      console.error("Error al agregar tarea al backlog:", error);
    }
  },

  moverTareaASprint: async (tareaId: string, sprintId: string) => {
    try {
      const state = useTareasStore.getState();
      const tarea = state.backlog.tareas.find((t) => t.id === tareaId);
      if (!tarea) throw new Error("Tarea no encontrada en el backlog");

      const updatedBacklog = {
        tareas: state.backlog.tareas.filter((t) => t.id !== tareaId),
      };

      const updatedSprints = state.sprintList.sprints.map((sprint) => {
        if (sprint.id === sprintId) {
          return { ...sprint, tareas: [...sprint.tareas, tarea] };
        }
        return sprint;
      });

      await updateBacklog(updatedBacklog);
      await updateSprintList({ sprints: updatedSprints });

      set({
        backlog: updatedBacklog,
        sprintList: { sprints: updatedSprints },
      });
    } catch (error) {
      console.error("Error al mover tarea a sprint:", error);
    }
  },

  actualizarTarea: async (tarea: ITarea, sprintId?: string) => {
    try {
      const state = useTareasStore.getState();

      if (sprintId) {
        const updatedSprints = state.sprintList.sprints.map((sprint) => {
          if (sprint.id === sprintId) {
            return {
              ...sprint,
              tareas: sprint.tareas.map((t) => (t.id === tarea.id ? tarea : t)),
            };
          }
          return sprint;
        });

        await updateSprintList({ sprints: updatedSprints });
        set({ sprintList: { sprints: updatedSprints } });
      } else {
        const updatedBacklog = {
          tareas: state.backlog.tareas.map((t) => (t.id === tarea.id ? tarea : t)),
        };

        await updateBacklog(updatedBacklog);
        set({ backlog: updatedBacklog });
      }
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  },

  actualizarSprint: async (sprint: ISprint) => {
    try {
      const state = useTareasStore.getState();
      const updatedSprints = state.sprintList.sprints.map((s) =>
        s.id === sprint.id ? { ...s, ...sprint } : s
      );

      await updateSprintList({ sprints: updatedSprints });
      set({ sprintList: { sprints: updatedSprints } });
    } catch (error) {
      console.error("Error al actualizar sprint:", error);
    }
  },

  eliminarTarea: async (tareaId: string, sprintId?: string) => {
    try {
      const state = useTareasStore.getState();

      if (sprintId) {
        const updatedSprints = state.sprintList.sprints.map((sprint) => {
          if (sprint.id === sprintId) {
            return {
              ...sprint,
              tareas: sprint.tareas.filter((t) => t.id !== tareaId),
            };
          }
          return sprint;
        });

        await updateSprintList({ sprints: updatedSprints });
        set({ sprintList: { sprints: updatedSprints } });
      } else {
        const updatedBacklog = {
          tareas: state.backlog.tareas.filter((t) => t.id !== tareaId),
        };

        await updateBacklog(updatedBacklog);
        set({ backlog: updatedBacklog });
      }
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  },

  setTareaActiva: (tarea: ITarea | ISprint | null) => set({ tareaActiva: tarea }),

  crearSprint: async (nuevoSprint) => {
    try {
      // Usar el endpoint correcto para la creación de sprints
      const response = await fetch("http://localhost:3000/sprintList", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoSprint),
      });

      if (!response.ok) {
        throw new Error("Error al crear el sprint");
      }

      set((state) => ({
        sprintList: {
          sprints: [...state.sprintList.sprints, nuevoSprint],
        },
      }));
    } catch (error) {
      console.error("Error al crear sprint:", error);
    }
  },
}));
