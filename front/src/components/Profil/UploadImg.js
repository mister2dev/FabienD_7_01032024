import React, { useState } from "react";
import axios from "axios";

const UploadImg = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");

  const handlePicture = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("userId", userId);
    data.append("image", file);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}api/user/updatePicture`,
        data,
        {
          withCredentials: false,
        }
      );

      console.log("data :", data);
      console.log("response :", response);
      if (response.data.error) {
        setError(response.data.error); // Stocker le message d'erreur dans l'état
      } else {
        // Mettez à jour le stockage local ou l'état avec le nouveau chemin de l'image
        localStorage.setItem("userPic", response.data.file);
        window.location.reload();
        setError("");
      }
    } catch (error) {
      //   if (error.response) {
      //     // La requête a été reçue par le serveur, mais il a renvoyé un code d'erreur
      //     console.error("Erreur de requête :", error.response.data);
      //     setError(error.response.data.error); // Stocker le message d'erreur dans l'état
      //   } else if (error.request) {
      //     // La requête a été effectuée, mais aucune réponse n'a été reçue
      //     console.error("Aucune réponse reçue pour la requête :", error.request);
      //   } else {
      //     // Une erreur s'est produite lors de la configuration de la requête
      //     console.error(
      //       "Erreur lors de la configuration de la requête :",
      //       error.message
      //     );
      //   }

      console.error(error);
      setError("An error occurred while uploading the picture");
    }
  };

  return (
    <>
      <form action="" onSubmit={handlePicture} className="upload-pic">
        <label htmlFor="file">Changer d'image</label>
        <input
          type="file"
          id="file"
          name="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />
        <input type="submit" value="Envoyer" />
      </form>
      <div className="uploadError">{error}</div>
    </>
  );
};

export default UploadImg;
