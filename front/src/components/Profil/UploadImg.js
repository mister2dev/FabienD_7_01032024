import React, { useState } from "react";
import axios from "axios";

const UploadImg = ({ setPreview }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");

  const handlePicture = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile)); // Mettre à jour la prévisualisation
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Veuillez sélectionner une image avant de la télécharger.");
      return;
    }

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
      console.error(error);
      setError("Une erreur s'est produite lors du téléchargement de l'image");
    }
  };

  return (
    <>
      <form action="" onSubmit={handleUpload} className="upload-pic">
        <label htmlFor="file">Changer d'image</label>
        <input
          type="file"
          id="file"
          name="file"
          accept=".jpg, .jpeg, .png"
          onChange={handlePicture}
        />
        <br />
        <input type="submit" value="Envoyer" />
      </form>
      <div className="uploadError">{error}</div>
    </>
  );
};

export default UploadImg;
