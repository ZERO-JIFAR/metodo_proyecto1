import { FC } from "react";
import { ISprint } from "../../../types/ISprint";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import styles from "./SprintCard.module.css";
import { useLocation, useNavigate } from "react-router-dom";

type IPropsSprintCard = {
  sprint: ISprint;
  onCardClick?: () => void;
  onDelete?: (id: string) => void;
  onView?: (sprint: ISprint) => void;
  onEdit?: (sprint: ISprint) => void;
};

const SprintCard: FC<IPropsSprintCard> = ({
  sprint,
  onDelete,
  onView,
  onEdit,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleDeleteClick = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Quieres eliminar el sprint "${sprint.nombre}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed && onDelete) {
      onDelete(sprint.id);
    }
  };

  const handleViewClick = () => {
    const currentPath = location.pathname;
    const isDetailView = currentPath.includes(`/sprint/`);

    if (isDetailView) {
      navigate("/"); // Volver al backlog
    } else {
      onView?.(sprint); // Ir al detalle del sprint
    }
  };

  return (
    <div className={styles.sprintCard}>
      <div className={styles.sprintCardHeader}>{sprint.nombre}</div>

      <div className={styles.sprintCardInfo}>
        <div>
          Inicio:{" "}
          {new Date(sprint.inicio).toLocaleDateString("es-AR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </div>
        <div>
          Cierre:{" "}
          {new Date(sprint.fin).toLocaleDateString("es-AR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </div>
      </div>

      <div className={styles.sprintCardButtons}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleViewClick();
          }}
        >
          <FaEye size={20} color="#C8B810" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit && onEdit(sprint);
          }}
        >
          <FaEdit size={20} color="#0D7DD8" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteClick();
          }}
        >
          <FaTrash size={20} color="#A90505" />
        </button>
      </div>
    </div>
  );
};

export default SprintCard;
