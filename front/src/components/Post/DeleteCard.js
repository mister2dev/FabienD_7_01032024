import React from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Importation de la bibliothèque

const DeleteCard = ({ getPosts, post }) => {
  const deleteQuote = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${process.env.REACT_APP_API_URL}api/post/${post.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Affiche une notification de succès après suppression
      Swal.fire({
        toast: true,
        position: "bottom-right",
        icon: "success",
        title: "Post supprimé",
        background: "#ffd0c4",
        color: "#5a3e36",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      getPosts(); // Rafraîchit la liste des posts
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Erreur",
        text: "Une erreur s'est produite lors de la suppression.",
        icon: "error",
      });
    }
  };

  const confirmDelete = () => {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      icon: "warning",
      background: "#ffd0c4", // Fond rose pêche
      color: "#5a3e36", // Texte doux et contrasté
      confirmButtonColor: "#e27d60", // Bouton légèrement plus foncé
      cancelButtonColor: "#a45c5c", // Bouton annuler plus foncé
      showCancelButton: true,
      confirmButtonText: "Oui, supprimer !",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteQuote();
      }
    });
  };

  return (
    <div onClick={confirmDelete}>
      <img src="./img/trash.svg" alt="trash" />
    </div>
  );
};

export default DeleteCard;
