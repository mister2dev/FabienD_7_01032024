import React from "react";

// On supprime le contenu du local storage pour ne plus avoir de token
const Logout = () => {
  const handleLogout = () => {
    localStorage.clear(); // On supprime tout le local storage (y compris le token)
    window.location = "/"; // On redirige vers la page d'accueil
  };

  return (
    <li onClick={handleLogout}>
      <img src="./img/logout.svg" alt="logout" />
    </li>
  );
};

export default Logout;
