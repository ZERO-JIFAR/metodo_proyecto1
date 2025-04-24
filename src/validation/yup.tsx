import * as Yup from "yup";

// Esquema de validación para tareas
export const tareaYup = Yup.object().shape({
  titulo: Yup.string()
    .min(3, "El título debe tener al menos 3 caracteres")
    .required("El título es obligatorio"),
  descripcion: Yup.string()
    .min(5, "La descripción debe tener al menos 5 caracteres")
    .required("La descripción es obligatoria"),
  fechaLimite: Yup.date()
    .min(new Date(), "La fecha límite debe ser en el futuro")
    .required("La fecha límite es obligatoria"),
});

// Esquema de validación para sprints
export const sprintYup = Yup.object().shape({
  nombre: Yup.string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .required("El nombre es obligatorio"),
  inicio: Yup.date()
    .required("La fecha de inicio es obligatoria"),
  fin: Yup.date()
    .min(Yup.ref("inicio"), "La fecha de fin debe ser posterior a la fecha de inicio")
    .required("La fecha de fin es obligatoria"),
});