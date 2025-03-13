import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { dateParser, isEmpty } from "../Utils";
import LikeButton from "./LikeButton";
import DeleteCard from "./DeleteCard";
import CardComments from "./CardComments";
import Swal from "sweetalert2";

const Card = ({ getPosts, post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [userData, setUserData] = useState([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const updateItem = () => {
    // Envoi de la mise à jour du texte si l'état textUpdate est non null
    if (textUpdate) {
      console.log("post1", post);

      return axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}api/post/${post.id}`,
        data: { file: post.attachment, content: textUpdate },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          console.log("res.data de updateItem :", res.data);
          setIsUpdated(false);
          getPosts();
        })
        .catch((err) => {
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
            console.error("Erreur Axios :", err.message);
          }
        });
    }
    console.log("post.attachment", post.attachment);
    setIsUpdated(false);
  };

  // Execution de la récuperation des données utilisateurs uniquement au premier chargement de la fonction Card

  const getUsersData = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/user/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsersData(res.data);
      })
      .catch((err) => console.log(err));
  }, [token]); // Dépend de `token`

  const getUserData = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/user/` + userId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => console.log(err));
  }, [userId, token]); // Dépend de `userId` et `token`

  const getComments = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/comment/` + post.id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => console.log(err));
  }, [post.id, token]); // Dépend de `post.id` et `token`

  useEffect(() => {
    getUsersData();
    getUserData();
    getComments();
  }, [getUsersData, getUserData, getComments]);

  // On desactive le loader dès que les données utilisateurs sont chargées
  useEffect(() => {
    if (!isEmpty(usersData)) {
      setIsLoading(false);
    }
  }, [usersData]);

  console.log("res.usersData", usersData);
  console.log("res.userData", userData);

  return (
    <li className="card-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                // Vérification de la présence des données pour éviter une erreur
                !isEmpty(usersData[0]) &&
                // Affichage de la photo utilisateur si l'id correspond à l'user_id du post sinon rien
                usersData
                  .map((user) => {
                    if (user.id === post.user_id) return user.attachment;
                    return null;
                  })
                  // Utilisation de join pour fixer le problème des virgules générées par map dans le rendu
                  .join("")
              }
              alt="poster-pic"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user.id === post.user_id) return user.username;
                        else return null;
                      })
                      .join("")}
                </h3>
              </div>
              {/* Affichage et formatage de la date */}
              <span>{dateParser(post.created_at)}</span>
            </div>
            {isUpdated === false && <p>{post.content}</p>}
            {isUpdated && (
              <div className="update-post">
                <textarea
                  defaultValue={post.content}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <div className="button-valide">
                  <button className="btn" onClick={updateItem}>
                    Valider
                  </button>
                </div>
              </div>
            )}{" "}
            {post.attachment && (
              <img src={post.attachment} alt="card-pic" className="card-pic" />
            )}
            {post.video && (
              <iframe
                width="500"
                height="300"
                src={post.video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={post._id}
              ></iframe>
            )}
            {/* Implémentation des droits admin ou user pour la suppression d'un post*/}
            <div className="icons-container">
              <div>
                {userData.id === post.user_id ? (
                  <div className="button-container">
                    <div onClick={() => setIsUpdated(!isUpdated)}>
                      <img src="./img/edit.svg" alt="edit" />
                    </div>
                    <DeleteCard post={post} getPosts={getPosts} />
                  </div>
                ) : (
                  userData.is_admin && (
                    <div className="button-container">
                      <DeleteCard post={post} getPosts={getPosts} />
                    </div>
                  )
                )}
              </div>
              <div className="card-footer">
                <div className="comment-icon">
                  <img
                    onClick={() => setShowComments(!showComments)}
                    src="./img/comment.jpg"
                    alt="comment"
                  />
                  <span>{comments.length}</span>
                </div>
                <LikeButton post={post} />
              </div>
            </div>
            {showComments && (
              <CardComments postId={post.id} getComments={getComments} />
            )}
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
