import { Route, Routes } from "react-router-dom";
import Profil from "./pages/Profil";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Connexion from "./pages/Connexion";

function App() {
  return (
    <div className="App">
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Connexion />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
