import React, { useEffect, useState } from "react";
import axios from "axios";

const DeleteComment = ({ comment, getComments, fetchComments, userData }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const userId = localStorage.getItem("userId");

  const handleDelete = () => {
    const token = localStorage.getItem("token");

    axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/comment/${comment.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log("Commentaire effacé:", res.data);
        getComments();
        fetchComments();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const checkAuthor = () => {
      if (parseInt(userId) === comment.user_id) {
        setIsAuthor(true);
      }
    };
    checkAuthor();
  }, [userId, comment.user_id]);

  return (
    <div className="edit-comment">
      {(userData.is_admin || isAuthor) && (
        <span
          className="button-container"
          onClick={() => {
            if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
              handleDelete();
            }
          }}
        >
          <img src="./img/trash.svg" alt="delete" />
        </span>
      )}
    </div>
  );
};

export default DeleteComment;
