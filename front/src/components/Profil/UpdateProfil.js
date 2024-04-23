import React from "react";
import UploadImg from "./UploadImg";

const UpdateProfil = () => {
  const user = localStorage.getItem("user");
  const userPic = localStorage.getItem("userPic");

  return (
    <div className="profil-container">
      <h1>Profil de {user}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3> Photo de profil</h3>
          <img src={userPic} alt="user-pic" />
          <UploadImg />
        </div>
      </div>
    </div>
  );
};

export default UpdateProfil;
