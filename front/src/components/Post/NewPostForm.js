import React, { useState, useEffect } from "react";
import { isEmpty } from "../Utils";
import axios from "axios";
import Swal from "sweetalert2";

const NewPostForm = ({ getPosts }) => {
  const userId = localStorage.getItem("userId");
  const userPicture = localStorage.getItem("userPic");
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [video, setVideo] = useState("");
  const [file, setFile] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prévisualisation de l'image et stockage dans l'état
  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setVideo("");
  };

  useEffect(() => {
    const handleVideo = () => {
      let findLink = message.split(" ");
      for (let i = 0; i < findLink.length; i++) {
        let videoId = null;

        // Vérifier si le lien est un lien YouTube standard
        if (findLink[i].includes("youtube.com/watch?v=")) {
          videoId = findLink[i].split("watch?v=")[1].split("&")[0];
        }
        // Vérifier si le lien est un lien YouTube mobile
        else if (findLink[i].includes("m.youtube.com/watch?v=")) {
          videoId = findLink[i].split("watch?v=")[1].split("&")[0];
        }
        // Vérifier si le lien est un lien YouTube raccourci (format partage)
        else if (findLink[i].includes("youtu.be/")) {
          videoId = findLink[i].split("youtu.be/")[1].split("?")[0];
        }

        // Si un ID vidéo a été trouvé, on le transforme en URL embeddable
        if (videoId) {
          const embedUrl = `https://www.youtube.com/embed/${videoId}`;
          setVideo(embedUrl);
          findLink.splice(i, 1);
          setMessage(findLink.join(" "));
          setPostPicture("");
        }
      }
    };

    handleVideo();
  }, [message, video]);

  // On génère un formulaire de données pour envoi au backend si il y a du texte, une image ou une vidéo
  const handlePost = async () => {
    if (isSubmitting) return; // Empêche le double envoi
    setIsSubmitting(true); // Désactive le bouton

    const token = localStorage.getItem("token");
    if (message || postPicture || video) {
      const formData = new FormData();
      formData.append("user_id", userId);
      formData.append("content", message);
      if (file) formData.append("image", file);
      formData.append("video", video);
      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}api/post/`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Met à jour les posts et réinitialise les champs
        getPosts();
        setMessage("");
        setPostPicture(null);
        setVideo("");
        setFile(null);
      } catch (err) {
        if (err.response && err.response.status === 400) {
          Swal.fire({
            toast: true,
            position: "bottom-right",
            icon: "warning",
            text: err.response.data.message,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        } else {
          console.error("Erreur Axios :", err.message);
        }
      } finally {
        setIsSubmitting(false); // Réactive le bouton après la requête
      }
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
              <div className="card-new-header">
                <div className="content">
                  <p>{message}</p>
                  <img src={postPicture} alt="" />
                  {video && (
                    <iframe
                      src={video}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={video}
                    ></iframe>
                  )}
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
                <div className="btn-pic">
                  <img src="./img/picture2.svg" alt="img" />
                  <input
                    type="file"
                    id="file-upload"
                    name="file"
                    accept=".jpg, .jpeg, .png, .gif"
                    onChange={(e) => handlePicture(e)}
                  />
                </div>
              </>
            )}
            {video && (
              <div className="btn-del-video" onClick={() => setVideo("")}>
                <img src="./img/delete-video.svg" alt="video delete" />
              </div>
            )}
          </div>
          <div className="btn-send">
            <button
              className="send"
              onClick={handlePost}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Envoi..." : "Envoyer"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPostForm;
