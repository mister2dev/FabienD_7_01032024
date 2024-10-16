import React, { useState } from "react";
import { isEmpty } from "../Utils";
import axios from "axios";

const NewPostForm = ({ getPosts }) => {
  const userId = localStorage.getItem("userId");
  const userPicture = localStorage.getItem("userPic");
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [video, setVideo] = useState("");
  const [file, setFile] = useState();

  // Prévisualisation de l'image et stockage dans l'état
  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setVideo("");
  };

  // On génère un formulaire de données pour envoi au backend si il y a du texte, une image ou une vidéo
  const handlePost = async () => {
    const token = localStorage.getItem("token");
    if (message || postPicture || video) {
      const formData = new FormData();
      formData.append("user_id", userId);
      formData.append("content", message);
      if (file) formData.append("image", file);

      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/post/`,
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        // Puis on recharge la page avec la mise à jour et on reinitialise les états
        .then(() => {
          getPosts();
          setMessage("");
          setPostPicture(null);
          setVideo("");
          setFile(null);
        })
        .catch((err) => console.log(err));
    } else {
      alert("Veuillez entrer un message");
    }
  };

  return (
    <div className="post-container">
      <div className="user-info">
        <img src={userPicture} alt="user-img" />
      </div>
      <div className="post-form">
        <textarea
          name="message"
          id="message"
          placeholder="Ajouter un message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        {message || postPicture || video.length > 20 ? (
          <li className="card-container">
            <div className="card-right">
              <div className="card-header">
                <div className="content">
                  <p>{message}</p>
                  <img src={postPicture} alt="" />
                </div>
              </div>
            </div>
          </li>
        ) : null}
        <div className="footer-form">
          <div className="icon">
            {/* S'il n'y a pas de vidéo de chargée, on propose le bouton charger une image */}
            {isEmpty(video) && (
              <>
                <img src="./img/picture.svg" alt="img" />
                <input
                  type="file"
                  id="file-upload"
                  name="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => handlePicture(e)}
                />
              </>
            )}
          </div>
          <div className="btn-send">
            <button className="send" onClick={handlePost}>
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPostForm;
