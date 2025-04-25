import { useEffect, useState } from "react";
import { deleteTareaController, getTareasController } from "../../../data/controllers/backlogController"; 
import ListTareas from "../../ui/listTareas/lisTareas";
import Modal from "../../ui/modalBacklog/modalBacklog"; 
import styles from "./backlog.module.css";
import Swal from "sweetalert2";
import { ITareaBacklog } from "../../../types/ITareaBacklog"; 
import { FaPlus } from "react-icons/fa"; // Importamos el ícono

const Backlog = () => {
  const [tareas, setTareas] = useState<ITareaBacklog[]>([]);
  const [showModal, setShowModal] = useState(false); 
  const [tareaSeleccionada, setTareaSeleccionada] = useState<ITareaBacklog | undefined>(undefined); 

  useEffect(() => {
    const fetchTareas = async () => {
      const proyectosData = await getTareasController(); 
      if (proyectosData) setTareas(proyectosData);
    };
    fetchTareas();
  }, []);

  const openModalCrear = () => {
    setTareaSeleccionada(undefined);
    setShowModal(true);
  };

  const openModalEditar = (proyecto: ITareaBacklog) => {
    setTareaSeleccionada(proyecto);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      await deleteTareaController(id);
      Swal.fire("Eliminado", "La tarea ha sido eliminada.", "success");
      refreshTareas();
    }
  };

  const refreshTareas = async () => {
    const proyectosData = await getTareasController(); 
    setTareas(proyectosData || []);
  };

  return (
    <main className={styles["tareas-screen-container"]}>
      <section className={styles["content-section"]}>
        <div className={styles["backlog-container"]}>
          <header className={styles.headerBacklog}>
            <h2 className={styles.title}>Backlog</h2>
            <button className={styles.iconButton} onClick={openModalCrear}>
              <FaPlus size={24} />
            </button>
          </header>

          {showModal && (
            <Modal
              closeModal={closeModal}
              refreshTareas={refreshTareas}
              tarea={tareaSeleccionada}
              esBacklog={true}
            />
          )}

          <div className={styles.containerTareas}>
            {tareas.map((tarea) => (
              <ListTareas
                key={tarea.id}
                proyecto={tarea}
                onEdit={() => openModalEditar(tarea)}
                onDelete={handleDelete}
                setTareas={setTareas}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Backlog;
