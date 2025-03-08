import React, { useState } from "react";
import UploadImg from "./UploadImg";
import { dateParser } from "../Utils";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateProfil = () => {
  const user = localStorage.getItem("user");
  const userPic = localStorage.getItem("userPic");
  const userId = localStorage.getItem("userId");
  const userText = localStorage.getItem("description");
  const userDate = localStorage.getItem("created_at");
  const token = localStorage.getItem("token");

  const [updateForm, setUpdateForm] = useState(false);
  const [bio, setBio] = useState(userText || "");
  const [preview, setPreview] = useState(
    userPic && userPic !== "null"
      ? userPic
      : "https://res.cloudinary.com/ddj78kfck/image/upload/v1740704749/avatar-no.png"
  );

  const handleUpdate = async () => {
    setUpdateForm(false);

    const data = { userId: userId, bio: bio };

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}api/user/updateUser`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: false,
        }
      );

      console.log("data :", data);
      console.log("response :", response);
      localStorage.setItem("description", bio);
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  const desactivateAccount = async () => {
    Swal.fire({
      title: "Désactiver votre compte ?",
      text: "Cette action est irréversible.",
      icon: "warning",
      background: "#ffd0c4",
      color: "#5a3e36",
      showCancelButton: true,
      confirmButtonColor: "#e27d60",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Oui, désactiver",
      cancelButtonText: "Annuler",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(
            `http://localhost:5000/api/auth/desactivate/${userId}`,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: false,
            }
          );

          if (response.status === 200) {
            localStorage.clear();
            window.location.href = "/";
          } else {
            console.error("Échec de la désactivation :", response.data);
            Swal.fire({
              icon: "error",
              title: "Erreur",
              text: "Impossible de désactiver le compte.",
              background: "#ffd0c4",
              color: "#5a3e36",
            });
          }
        } catch (error) {
          console.error("Erreur :", error);
          Swal.fire({
            icon: "error",
            title: "Erreur",
            text: "Une erreur est survenue. Veuillez réessayer.",
            background: "#ffd0c4",
            color: "#5a3e36",
          });
        }
      }
    });
  };

  return (
    <div className="profil-container">
      <h1>Profil de {user}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src={preview} alt="user-pic" />
          <UploadImg setPreview={setPreview} />
        </div>

        <div className="right-part">
          <div className="description">
            <h3>Description</h3>
            {updateForm === false ? (
              <>
                <p onClick={() => setUpdateForm(!updateForm)}>{bio}</p>
                <button onClick={() => setUpdateForm(!updateForm)}>
                  Modifier
                </button>
              </>
            ) : (
              <>
                <textarea
                  type="text"
                  defaultValue={bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <button onClick={handleUpdate}>Valider</button>
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
