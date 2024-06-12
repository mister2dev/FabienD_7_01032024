import React from "react";
import axios from "axios";

const Logout = () => {
  const removetoken = () => {
    if (typeof window !== "undefined") {
      //localStorage.removeItem("token");
      localStorage.clear();
    }
  };

  const handleLogout = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/auth/logout`,
      withCredentials: false,
    })
      .then(() => removetoken())
      .catch((err) => console.log(err));

    window.location = "/";
  };

  return (
    <li onClick={handleLogout}>
      <img src="./img/logout.svg" alt="logout" />
    </li>
  );
};

export default Logout;
