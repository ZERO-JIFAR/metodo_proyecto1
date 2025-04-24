import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BacklogScreen from "./components/screens/backlog/backlog.tsx";
import SprintScreen from "./components/screens/sprint/sprint.tsx";
import SprintsAside from "./components/ui/sidebar/sidebar.tsx";
import "./index.css";

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <SprintsAside />
        <Routes>
          <Route path="/" element={<BacklogScreen />} />
          <Route path="/sprint/:id" element={<SprintScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;