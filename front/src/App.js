import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import Profil from "./pages/Profil";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
