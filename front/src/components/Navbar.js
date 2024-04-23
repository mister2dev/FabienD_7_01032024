//import React, { useContext } from "react";
//import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
//import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";

const Navbar = () => {
  //  const uid = useContext(UidContext);
  //  const userData = useSelector((state) => state.userReducer);
  const user = localStorage.getItem("user");

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink to="/">
            <div className="logo">
              <img src="./img/icon-left-font.png" alt="icon" />
            </div>
          </NavLink>
        </div>
        {localStorage.token ? (
          <ul>
            <li></li>
            <li className="welcome">
              <NavLink to="/profil">
                <h5>Bienvenue {user}</h5>
              </NavLink>
            </li>
            <Logout />
          </ul>
        ) : (
          <ul>
            <li></li>
            <li>
              <NavLink to="/connexion">
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
