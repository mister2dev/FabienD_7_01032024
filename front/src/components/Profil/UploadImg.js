import React, { useState } from "react";
import axios from "axios";
//import { useDispatch, useSelector } from "react-redux";
//import { uploadPicture } from "../../actions/user.actions";

const UploadImg = () => {
  const [file, setFile] = useState();
  const [error, setError] = useState("");

  //const dispatch = useDispatch();
  //const userData = useSelector((state) => state.userReducer);

  const handlePicture = (e) => {
    e.preventDefault();
    const data = new FormData();
    //data.append("name", userData.pseudo);
    //data.append("userId", userData._id);
    data.append("file", file);

    //dispatch(uploadPicture(data, userData._id));

    try {
      const response = axios.post(
        `${process.env.REACT_APP_API_URL}api/user/updatePicture`,
        {
          file,
        },
        {
          withCredentials: false,
        }
      );

      if (response.data.error) {
        setError(response.data.error); // Stocker le message d'erreur dans l'état
      }
      //   console.log("Réponse :", response.data);
      //   localStorage.setItem("user", response.data.user);
      //   localStorage.setItem("token", response.data.token);
      //   localStorage.setItem("userPic", response.data.imagePath);
      //window.location = "/";
      //}
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
