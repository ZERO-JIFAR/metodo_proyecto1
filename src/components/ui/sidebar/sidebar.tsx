import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ISprint } from "../../../types/ISprint";
import SprintCard from "../sprintCard/sprintCard";
import {
  getSprintsController,
  deleteSprintController,
} from "../../../data/controllers/sprintController";
import styles from "./sidebar.module.css";
import SprintModal from "../modalSprint/modalSprint";
import Swal from "sweetalert2";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Para verificar la ruta actual
  const [sprints, setSprints] = useState<ISprint[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedSprint, setSelectedSprint] = useState<ISprint | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  useEffect(() => {
    const fetchSprints = async () => {
      const sprintsData = await getSprintsController();
      if (sprintsData) {
        setSprints(sprintsData);
      }
    };
    fetchSprints();
  }, []);

  const isDetailPage = location.pathname.includes("/sprint/");

  const handleCardClick = (id: string) => {
    if (isDetailPage) {
      // Si ya estamos en la página de detalles, volver a la lista
      navigate("/");
    } else {
      // Si no estamos en la página de detalles, ir al detalle del sprint
      navigate(`/sprint/${id}`);
    }
  };

  const openModal = (sprint: ISprint | null = null, edit: boolean = false) => {
    setSelectedSprint(sprint);
    setIsEditMode(edit);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSprint(null);
    setIsEditMode(false);
  };

  const refreshSprints = async () => {
    const sprintsData = await getSprintsController();
    if (sprintsData) {
      setSprints(sprintsData);
    }
  };

  const handleDeleteSprint = async (id: string) => {
    await deleteSprintController(id);
    const updatedSprints = sprints.filter((sprint) => sprint.id !== id);
    setSprints(updatedSprints);
    Swal.fire("Eliminado", "El sprint ha sido eliminado.", "success");
  };

  const handleViewSprint = (sprint: ISprint) => {
    navigate(`/sprint/${sprint.id}`, { state: sprint });
  };

  const handleEditSprint = (sprint: ISprint) => {
    openModal(sprint, true);
  };

  return (
    <div className={styles.containerAsideWrapper}>
      <div className={styles.fullHeightBox}>
        <div className={styles.containerAside}>
          <div className={styles.containerTitleButton}>
            <h3 className={styles.title}>
              LISTA DE SPRINTS
              <button
                className={styles.addButton}
                onClick={() => openModal()}
                title="Agregar nuevo sprint"
              >
                +
              </button>
            </h3>
          </div>

          <div className={styles.line}></div>

          <div className={styles.sprintCardContainer}>
            {sprints.map((sprint) => (
              <SprintCard
                key={sprint.id}
                sprint={sprint}
                onCardClick={() => handleCardClick(sprint.id)} // Usamos handleCardClick aquí
                onDelete={handleDeleteSprint}
                onView={handleViewSprint}
                onEdit={handleEditSprint}
              />
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <SprintModal
          closeModal={closeModal}
          refreshSprints={refreshSprints}
          editMode={isEditMode}
          sprint={selectedSprint ?? undefined}
        />
      )}
    </div>
  );
};

export default Sidebar;
