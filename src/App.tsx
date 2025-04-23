import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TareasScreen } from "./components/screens/TareasScreen";
import { Sprints } from "./components/ui/Sprints/Sprints";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principal que muestra la lista de tareas */}
        <Route path="/" element={<TareasScreen />} />
        
        {/* Ruta para mostrar los detalles de un sprint */}
        <Route path="/sprints/:sprintId" element={<Sprints />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;