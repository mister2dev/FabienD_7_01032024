import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { commentDateParser, isEmpty } from "../Utils";
import DeleteComment from "./DeleteComment";

const CardComments = ({ postId, getComments, comment }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  // const [editingCommentId, setEditingCommentId] = useState(null); // ID du commentaire en cours d'édition
  // const [textUpdate, setTextUpdate] = useState(""); // Texte pour la mise à jour
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);

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
  }, [token]);

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
  }, [userId, token]);

  const fetchComments = useCallback(() => {
    setLoading(true); // Début du chargement des commentaires
    axios
      .get(`${process.env.REACT_APP_API_URL}api/comment/` + postId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setComments(res.data);
        setLoading(false); // Fin du chargement
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [postId, token]);

  useEffect(() => {
    getUsersData();
    getUserData();
    fetchComments();
  }, [getUsersData, getUserData, fetchComments]);

  const handleComment = (e) => {
    e.preventDefault();
    if (text) {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/comment/`,
        data: {
          user_id: userId,
          post_id: postId,
          content: text,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {
          setText(""); // On efface le champ input
          getComments(); // On raffraichit la liste des données
          fetchComments();
        })
        .catch((err) => console.log(err));
    }
  };

  const updateComment = (commentID) => {
    if (textUpdate) {
      return axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}api/comment/${commentID}`,
        data: {
          content: textUpdate,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {
          setIsUpdated(false);
          setTextUpdate("");
          fetchComments();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="comments-container">
      {comments.map((comment) => (
        <div className="comment-container" key={comment.id}>
          <div className="left-part">
            <img
              src={
                (!isEmpty(usersData) &&
                  usersData
                    .filter((user) => user.id === comment.user_id)
                    .map((user) => user.attachment)
                    .join("")) ||
                undefined
              }
              alt="comment-pic"
            />
          </div>
          <div className="right-part">
            <div className="comment-header">
              <div className="pseudo">
                {!isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user.id === comment.user_id) return user.username;
                      else return null;
                    })
                    .join("")}
              </div>
              <span>{commentDateParser(comment.createdAt)}</span>
            </div>
            {isUpdated === false && <p>{comment.content}</p>}
            {isUpdated && (
              <div className="update-comment">
                <textarea
                  defaultValue={comment.content}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <div className="button-valide">
                  <button
                    className="btn"
                    onClick={() => updateComment(comment.id)}
                  >
                    Valider
                  </button>
                </div>
              </div>
            )}{" "}
            {userData.id === comment.user_id ? (
              <div className="button-container">
                <div onClick={() => setIsUpdated(!isUpdated)}>
                  <img src="./img/edit.svg" alt="edit" />
                </div>
                <DeleteComment
                  comment={comment}
                  getComments={getComments}
                  fetchComments={fetchComments}
                  userData={userData}
                />
              </div>
            ) : (
              userData.is_admin && (
                <div className="button-container">
                  <DeleteComment
                    comment={comment}
                    getComments={getComments}
                    fetchComments={fetchComments}
                    userData={userData}
                  />
                </div>
              )
            )}
          </div>
        </div>
      ))}
      {!loading &&
        userId && ( // Rendu du formulaire uniquement après le chargement
          <form action="" onSubmit={handleComment} className="comment-form">
            <input
              type="text"
              name="text"
              onChange={(e) => setText(e.target.value)}
              value={text}
              placeholder="Laisser un commentaire"
            />
            <br />
            <input type="submit" value="Envoyer" />
          </form>
        )}
    </div>
  );
};

export default CardComments;
