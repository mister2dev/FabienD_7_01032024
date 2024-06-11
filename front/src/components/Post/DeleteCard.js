import React from "react";
import axios from "axios";

const DeleteCard = ({ post, reloadPosts }) => {
  const deleteQuote = () => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/post/${post.id}`,
    })
      .then((res) => {
        console.log("res.data de updateItem :", res.data);
        reloadPosts();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer cet article ?")) {
          deleteQuote();
        }
      }}
    >
      <img src="./img/trash.svg" alt="trash" />
    </div>
  );
};

export default DeleteCard;
