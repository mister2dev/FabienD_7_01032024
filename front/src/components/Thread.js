import React, { useEffect, useState } from "react";
import { isEmpty } from "./Utils";
import Card from "./Post/Card";

const Thread = ({ getPosts, posts }) => {
  const [loadPost, setLoadPost] = useState(true);

  // Hooks permettant de charger les posts sur la page la 1ere fois puis si il y a un changement sur loadPost ou getPosts
  useEffect(() => {
    if (loadPost) {
      getPosts();
      setLoadPost(false);
    }
  }, [loadPost, getPosts]);

  return (
    <div className="thread-container">
      <ul>
        {!isEmpty(posts) &&
          posts.map((post) => {
            return <Card reloadPosts={getPosts} post={post} key={post.id} />;
          })}
      </ul>
    </div>
  );
};

export default Thread;
