import React, { useEffect, useState } from "react";
import axios from "axios";

const DeleteComment = ({ comment, reloadComments }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const userId = localStorage.getItem("userId");

  const handleDelete = () => {
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/comment/${comment.id}`,
    })
      .then((res) => {
        console.log("Comment deleted:", res.data);
        reloadComments(); // Call this function to refresh the comments list
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
      {isAuthor && (
        <div className="button-container">
          <span
            onClick={() => {
              if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
                handleDelete();
              }
            }}
          >
            <img src="./img/trash.svg" alt="delete" />
          </span>
        </div>
      )}
    </div>
  );
};

export default DeleteComment;
