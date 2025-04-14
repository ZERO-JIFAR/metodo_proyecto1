import { Header } from "../ui/Header/Header";
import { ListTareas } from "../ui/ListTareas/ListTareas";
import Backlog from "../ui/Backlog/Backlog"; // Importación correcta
import "./TareasScreen.css";
import { useScreenStore } from "../../store/screenStateStore";
import { Sprints } from "../ui/Sprints/Sprints";

export const TareasScreen = () => {
    const { activeView } = useScreenStore();
    return (
        <div className="tareas-screen-container">
            <Header />
            <div className="content-section">
                <ListTareas /> {/* Sección de la lista */}
                { activeView === "backlog" ? <Sprints /> : <Backlog />} {/* Sección del backlog/sprints */}
            </div>
        </div>
    );
};
