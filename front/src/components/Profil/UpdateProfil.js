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
  const token = localStorage.getItem("token");

  const [updateForm, setUpdateForm] = useState(false);
  const [bio, setBio] = useState(userText || "");

  // Prévisualisation de l'icone utilisateur
  const [preview, setPreview] = useState(
    userPic && userPic !== "null"
      ? userPic
      : // Image utilisateur par defaut
        "http://localhost:5000/images/avatar-no.png"
  );

  const handleUpdate = async () => {
    setUpdateForm(false);

    // Mise à jour de la description
    const data = {
      userId: userId,
      bio: bio,
    };

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}api/user/updateUser`,
        data,
        {
          headers: {
            // Ajout du token dans les en-têtes d'autorisation
            Authorization: `Bearer ${token}`,
          },
          withCredentials: false,
        }
      );

      console.log("data :", data);
      console.log("response :", response);
      // Mise à jour de la description dans le localStorage seulement si la requête est réussie
      localStorage.setItem("description", bio);
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  const desactivateAccount = async () => {
    const isConfirmed = window.confirm(
      "Voulez-vous vraiment désactiver le compte ?"
    );
    if (!isConfirmed) return;

    try {
      const response = await axios.post(
        `http://localhost:5000/api/auth/desactivate/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: false,
        }
      );

      // Si la désactivation est réussie, retour à la page de connexion
      if (response.status === 200) {
        localStorage.clear();
        window.location.href = "/";
      } else {
        // Gestion d'une réponse inattendue
        console.error("Échec de la désactivation du compte :", response.data);
        alert("Une erreur est survenue lors de la désactivation du compte.");
      }
    } catch (error) {
      // Gestion des erreurs de requête
      console.error("Erreur lors de la désactivation du compte :", error);
      alert("Impossible de désactiver le compte. Veuillez réessayer.");
    }
  };

  return (
    <div className="profil-container">
      <h1>Profil de {user}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img
            src={preview} // Utiliser l'état de prévisualisation
            alt="user-pic"
          />
          <UploadImg setPreview={setPreview} />
        </div>

        <div className="right-part">
          <div className="description">
            <h3>Description</h3>
            {/* Si updateForm est à 0, on affiche la description */}
            {updateForm === false && (
              <>
                <p onClick={() => setUpdateForm(!updateForm)}>{bio}</p>
                <button onClick={() => setUpdateForm(!updateForm)}>
                  Modifier
                </button>
              </>
            )}
            {/* Si updateForm est à 1, on passe en mode textarea pour pouvoir enregistrer une nouvelle description */}
            {updateForm && (
              <>
                <textarea
                  type="text"
                  defaultValue={bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <button onClick={handleUpdate}>Valider </button>
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
