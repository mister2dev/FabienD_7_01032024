import React, { useEffect, useState } from "react";
import axios from "axios";
//import Card from "./Post/Card";
import { isEmpty } from "./Utils";
import Card from "./Post/Card";

const Thread = () => {
  const [loadPost, setLoadPost] = useState(true);
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/post/`)
      .then((res) => {
        console.log("res.data", res.data);
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (loadPost) {
      getPosts();
      setLoadPost(false);
    }
  }, [loadPost]);

  return (
    <div className="thread-container">
      <ul>
        {!isEmpty(posts[0]) &&
          posts.map((post) => {
            return <Card post={post} key={post.id} />;
          })}
      </ul>
    </div>
  );
};

export default Thread;
