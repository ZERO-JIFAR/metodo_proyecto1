import { Header } from "../ui/Header/Header";
import { ListTareas } from "../ui/ListTareas/ListTareas";
import Backlog from "../ui/Backlog/Backlog"; // Importación correcta
import "./TareasScreen.css";

export const TareasScreen = () => {
    return (
        <div className="tareas-screen-container">
            <Header />
            <div className="content-section">
                <ListTareas /> {/* Sección de la lista */}
                <Backlog /> {/* Sección del backlog */}
            </div>
        </div>
    );
};
