import React, { useState, useEffect } from "react";
import axios from "axios";

const LikeButton = ({ post }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    // On récupére le nombre de likes
    const fetchLikes = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}api/like/likeCount`,
          {
            params: { user_id: userId, post_id: post.id },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLikeCount(response.data.LikesNumber);

        // On Vérifie si l'utilisateur actuel a déjà liké ce post
        setIsLiked(response.data.UserLike);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLikes();
  }, [post.id, userId, token]);

  const handleLike = async () => {
    try {
      // Si déjà liké par le user, on annule le like en bdd
      if (isLiked) {
        await axios.post(
          `${process.env.REACT_APP_API_URL}api/like/like`,
          { user_id: userId, post_id: post.id, like: -1 },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLikeCount(likeCount - 1);
      } else {
        // Sinon on l'ajoute
        await axios.post(
          `${process.env.REACT_APP_API_URL}api/like/like`,
          { user_id: userId, post_id: post.id, like: 1 },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLikeCount(likeCount + 1);
      }
      setIsLiked(!isLiked);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="like-btn" onClick={handleLike}>
      {isLiked ? (
        <img src="./img/like.jpg" alt="like" />
      ) : (
        <img src="./img/unlike.jpg" alt="unlike" />
      )}
      {likeCount}
    </div>
  );
};

export default LikeButton;
