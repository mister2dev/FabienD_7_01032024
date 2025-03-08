import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

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

        Swal.fire({
          toast: true,
          position: "bottom-right",
          icon: "success",
          title: "Commentaire supprimé",
          background: "#ffd0c4",
          color: "#5a3e36",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setIsAuthor(parseInt(userId) === comment.user_id);
  }, [userId, comment.user_id]);

  const confirmDelete = () => {
    Swal.fire({
      title: "Supprimer ce commentaire ?",
      icon: "warning",
      background: "#ffd0c4",
      color: "#5a3e36",
      showCancelButton: true,
      confirmButtonColor: "#e27d60",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete();
      }
    });
  };

  return (
    <div className="edit-comment">
      {(userData.is_admin || isAuthor) && (
        <span className="button-container" onClick={confirmDelete}>
          <img src="./img/trash.svg" alt="delete" />
        </span>
      )}
    </div>
  );
};

export default DeleteComment;
