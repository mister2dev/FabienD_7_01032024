import React from "react";
import Thread from "../components/Thread";
import NewPostForm from "../components/Post/NewPostForm";
import Log from "../components/Log";

const Home = () => {
  const userId = localStorage.getItem("userId");

  return (
    <div className="home">
      <div className="main">
        <div className="home-header">
          {userId ? <NewPostForm /> : <Log signin={true} signup={false} />}{" "}
        </div>
        <Thread />
      </div>
    </div>
  );
};

export default Home;
