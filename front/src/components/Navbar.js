import { NavLink } from "react-router-dom";
import Logout from "./Log/Logout";

const Navbar = () => {
  const user = localStorage.getItem("user");
  const userPic = localStorage.getItem("userPic");

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          {/* <NavLink to="/"> */}
          <div className="logo">
            <img src="./img/icon-left-font-bis.png" alt="icon" />
          </div>
          {/* </NavLink> */}
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
