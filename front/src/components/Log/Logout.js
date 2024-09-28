import React from "react";
import axios from "axios";

// On supprime le contenu du local storage pour ne plus avoir de token

const Logout = () => {
  const removetoken = () => {
    localStorage.clear();
  };

  const handleLogout = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/auth/logout`,
      withCredentials: false,
    })
      .then(() => removetoken())
      .catch((err) => console.log(err));

    window.location = "/connexion";
  };

  return (
    <li onClick={handleLogout}>
      <img src="./img/logout.svg" alt="logout" />
    </li>
  );
};

export default Logout;
