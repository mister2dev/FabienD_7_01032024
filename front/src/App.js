import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import Profil from "./pages/Profil";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <div>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
