import React, { useState } from "react";
import Thread from "../components/Thread";
import NewPostForm from "../components/Post/NewPostForm";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);

  // Récuperation de tous les posts
  const getPosts = () => {
    const token = localStorage.getItem("token");

    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/`, {
        headers: {
          // Ajout du token dans l'en-tête Authorization
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // Enregistrement des posts dans l'état
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="home">
      <div className="main">
        <div className="home-header">
          {/* Envoi d'une props avec tous les posts dans l'élement NewPostForm afin de rafraichir la page après un nouveau post */}
          <NewPostForm getPosts={getPosts} />
        </div>
        {/* Envoi d'une props avec tous les posts dans l'élement Thread */}
        <Thread getPosts={getPosts} posts={posts} />
      </div>
    </div>
  );
};

export default Home;
