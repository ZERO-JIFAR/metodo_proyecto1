import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BacklogScreen from "./components/screens/backlog/backlog.tsx";
import SprintScreen from "./components/screens/sprint/sprint.tsx";
import SprintsAside from "./components/ui/sidebar/sidebar.tsx";
import "./index.css";

function App() {
  return (
    <Router>
      <div style={{ display: "flex", height: "100vh", width: "100%" }}>
        <SprintsAside />
        <div style={{ flex: 1, height: "100%", backgroundColor: "#e6f7ff", overflowY: "auto" }}>
          <Routes>
            <Route path="/" element={<BacklogScreen />} />
            <Route path="/sprint/:id" element={<SprintScreen />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;