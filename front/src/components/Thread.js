import React, { useEffect, useState } from "react";
import { isEmpty } from "./Utils";
import Card from "./Post/Card";

const Thread = ({ getPosts, posts }) => {
  const [loadPost, setLoadPost] = useState(true);
  const [count, setCount] = useState(3);

  // Fonction qui permet de repasser loadPost a true lorsque la scrollbar touche le bas de la fenêtre window
  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadPost(true);
    }
  };

  // Hooks permettant de charger les 3 premiers posts sur la page la 1ere fois puis si il y a un changement sur loadPost,getPosts ou count
  useEffect(() => {
    if (loadPost) {
      getPosts(count);
      setLoadPost(false);
      setCount(count + 3);
    }

    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [loadPost, getPosts, count]);

  return (
    <div className="thread-container">
      <ul>
        {!isEmpty(posts) &&
          posts.map((post) => {
            return <Card getPosts={getPosts} post={post} key={post.id} />;
          })}
      </ul>
    </div>
  );
};

export default Thread;
