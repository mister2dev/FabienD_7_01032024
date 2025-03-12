import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

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

    const token = localStorage.getItem("token");

    const data = new FormData();
    data.append("userId", userId);
    data.append("image", file);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}api/user/updatePicture`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ajout du token dans les en-têtes d'autorisation
          },
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

        // Condition remplie : déclenchez un événement personnalisé
        const event = new CustomEvent("userPicUpdated");
        window.dispatchEvent(event);

        // window.location.reload();
        setError("");
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        Swal.fire({
          toast: true,
          position: "bottom-right",
          icon: "warning",
          text: err.response.data.message, // Message du backend
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      } else {
        console.error(err);
        setError("Une erreur s'est produite lors du téléchargement de l'image");
      }
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
          accept=".jpg, .jpeg, .png, .gif"
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
