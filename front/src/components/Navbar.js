import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Logout from "./Log/Logout";

const Navbar = () => {
  const user = localStorage.getItem("user");
  const [userPic, setUserPic] = useState(localStorage.getItem("userPic"));

  useEffect(() => {
    // Fonction de gestion de l'événement pour recharger userPic
    const handleUserPicUpdate = () => {
      setUserPic(localStorage.getItem("userPic"));
    };

    // Ajouter un écouteur pour le CustomEvent "userPicUpdated"
    window.addEventListener("userPicUpdated", handleUserPicUpdate);

    // Nettoyage de l'écouteur
    return () => {
      window.removeEventListener("userPicUpdated", handleUserPicUpdate);
    };
  }, []);

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink to="/home">
            <div className="logo">
              <img src="./img/icon-left-font-bis.png" alt="icon" />
            </div>
          </NavLink>
        </div>
        {localStorage.token ? (
          <ul>
            <li></li>
            <li className="welcome">
              <NavLink to="/profil">
                <div className="user-connexion">
                  <img src={userPic} alt="user-pic" />
                  <h5>Bienvenue {user}</h5>
                </div>
              </NavLink>
            </li>
            <Logout />
          </ul>
        ) : (
          <ul>
            <li></li>
            <li>
              <NavLink to="/">
                <img src="./img/login.svg" alt="login" />
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
