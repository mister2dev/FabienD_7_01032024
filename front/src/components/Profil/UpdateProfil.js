import React, { useState } from "react";
import UploadImg from "./UploadImg";
import { dateParser } from "../Utils";
import axios from "axios";

const UpdateProfil = () => {
  const user = localStorage.getItem("user");
  const userPic = localStorage.getItem("userPic");
  const userId = localStorage.getItem("userId");
  const userText = localStorage.getItem("description");
  const userDate = localStorage.getItem("createdAt");

  const [updateForm, setUpdateForm] = useState(false);
  const [bio, setBio] = useState(userText || "");

  const handleUpdate = async () => {
    setUpdateForm(false);

    const data = {
      userId: userId,
      bio: bio,
    };

    try {
      const response = axios.put(
        `${process.env.REACT_APP_API_URL}api/user/updateUser`,
        data,
        {
          withCredentials: false,
        }
      );

      console.log("data :", data);
      console.log("response :", response);

      // if (response.data.error) {
      //   setError(response.data.error); // Stocker le message d'erreur dans l'état
      // } else {
      //   // Mettez à jour le stockage local ou l'état avec le nouveau chemin de l'image
      // }
    } catch (error) {}
    localStorage.setItem("description", bio);
  };

  const desactivateAccount = () => {
    axios.post(`http://localhost:5000/api/auth/desactivate/${userId}`);

    if (!window.confirm(`Voulez-vous vraiment désactiver le compte ?`)) return;
    localStorage.clear();
    window.location.href = "/connexion";
  };

  return (
    <div className="profil-container">
      <h1>Profil de {user}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3> Photo de profil</h3>
          <img src={userPic} alt="user-pic" />
          <UploadImg />
        </div>

        <div className="right-part">
          <div className="description">
            <h3>Decription</h3>
            {updateForm === false && (
              <>
                <p onClick={() => setUpdateForm(!updateForm)}>{userText}</p>
                <button onClick={() => setUpdateForm(!updateForm)}>
                  Modifier
                </button>
              </>
            )}
            {updateForm && (
              <>
                <textarea
                  type="text"
                  defaultValue={userText}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <button onClick={handleUpdate}>Valider modifications</button>
              </>
            )}
          </div>
          <h4>Membre depuis {dateParser(userDate)}</h4>
          <button onClick={desactivateAccount}>Désactiver compte</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfil;
