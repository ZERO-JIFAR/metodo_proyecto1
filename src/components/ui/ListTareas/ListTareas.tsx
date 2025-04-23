import { useEffect, useState } from "react";
import { useTareasStore } from "../../../store/tareaStore";
import styles from "./ListTareas.module.css";
import { Modal } from "../Modal/Modal";
import { IoMdAddCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export const ListTareas = () => {
  const { sprintList, cargarDatos, setTareaActiva } = useTareasStore();
  const [openModalTarea, setOpenModalTarea] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await cargarDatos();
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, [cargarDatos]);

  const handleOpenModal = (sprint: any = null) => {
    if (sprint) {
      setTareaActiva({ ...sprint, tipo: "sprint" }); // aseguramos el tipo
    } else {
      setTareaActiva(null);
    }
    setOpenModalTarea(true);
  };

  const handleCloseModal = () => {
    setOpenModalTarea(false);
  };

  const handleViewSprint = (sprintId: string) => {
    navigate(`/sprints/${sprintId}`);
  };

  return (
    <>
      <div className={styles.containerPrincipalListTareas}>
        <div className={styles.containerList}>
          <div className={styles.containerTitleAndButton}>
            <h3>
              <u>Lista de Sprints</u>
            </h3>
            <button onClick={() => handleOpenModal()} className={styles.botonAgregar}>
              <h1>
                <IoMdAddCircle />
              </h1>
            </button>
          </div>
          {sprintList.sprints.length > 0 ? (
            sprintList.sprints.map((sprint) => (
              <div key={sprint.id} className={`${styles.sprintContainer} ${styles.sprintCard}`}>
                <h4>{sprint.nombre}</h4>
                <p>Inicio: {sprint.fechaInicio}</p>
                <p>Cierre: {sprint.fechaCierre}</p>
                <div className={styles.sprintActions}>
                  <button onClick={() => handleViewSprint(sprint.id)} className={styles.botonVer}>
                    👁️
                  </button>
                  <button onClick={() => handleOpenModal(sprint)} className={styles.botonEditar}>
                    ✏️
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div>
              <h2>No hay Sprints disponibles</h2>
            </div>
          )}
        </div>
      </div>
      {openModalTarea && <Modal handleCloseModal={handleCloseModal} />}
    </>
  );
};
