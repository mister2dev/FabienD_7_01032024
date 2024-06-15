import React, { useState } from "react";
import Thread from "../components/Thread";
import NewPostForm from "../components/Post/NewPostForm";
import Log from "../components/Log";
import axios from "axios";

const Home = () => {
  const userId = localStorage.getItem("userId");
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/`)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="home">
      <div className="main">
        <div className="home-header">
          {userId ? (
            <NewPostForm getPosts={getPosts} />
          ) : (
            <Log signin={true} signup={false} />
          )}
        </div>
        <Thread getPosts={getPosts} posts={posts} />
      </div>
    </div>
  );
};

export default Home;
