import React, { useEffect, useState } from "react";
import axios from "axios";
import { dateParser, isEmpty } from "../Utils";
import LikeButton from "./LikeButton";
import DeleteCard from "./DeleteCard";
import CardComments from "./CardComments";

const Card = ({ post, reloadPosts }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [usersData, setUsersData] = useState([]);
  const [userData, setUserData] = useState([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  //const [attachmentUpdate, setAttachmentUpdate] = useState();

  const updateItem = () => {
    if (textUpdate) {
      //setAttachmentUpdate(post.attachment);
      console.log("post1", post);
      //console.log("updateItem", attachmentUpdate);

      return axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}api/post/${post.id}`,
        data: { file: post.attachment, content: textUpdate },
        headers: {
          Authorization: `Bearer ${token}`, // Ajout du token dans l'en-tête Authorization
        },
      })
        .then((res) => {
          console.log("res.data de updateItem :", res.data);
          setIsUpdated(false);
          reloadPosts();
        })
        .catch((err) => console.log(err));
    }
    console.log("post.attachment", post.attachment);
    setIsUpdated(false);
  };

  useEffect(() => {
    const getUsersData = () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}api/user/`)
        .then((res) => {
          setUsersData(res.data);
        })
        .catch((err) => console.log(err));
    };

    getUsersData();
  }, []);

  useEffect(() => {
    const getUserData = () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}api/user/` + userId)
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => console.log(err));
    };

    getUserData();
  }, [userId]);

  useEffect(() => {
    if (!isEmpty(usersData)) {
      setIsLoading(false);
    }
  }, [usersData]);

  console.log("res.usersData", usersData);

  return (
    <li className="card-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user.id === post.user_id) return user.attachment;
                    return null;
                  })
                  .join("")
              }
              alt="poster-pic"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user.id === post.user_id) return user.username;
                        else return null;
                      })
                      .join("")}
                </h3>
              </div>
              <span>{dateParser(post.createdAt)}</span>
            </div>
            {isUpdated === false && <p>{post.content}</p>}
            {isUpdated && (
              <div className="update-post">
                <textarea
                  defaultValue={post.content}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <div className="button-container">
                  <button className="btn" onClick={updateItem}>
                    Valider modification
                  </button>
                </div>
              </div>
            )}{" "}
            {post.attachment && (
              <img src={post.attachment} alt="card-pic" className="card-pic" />
            )}
            {/* {post.video && (
              <iframe
                width="500"
                height="300"
                src={post.video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={post._id}
              ></iframe>
            )} */}
            {userData.is_admin ? (
              <div className="button-container">
                <DeleteCard
                  post={post}
                  reloadPosts={reloadPosts}
                  id={post.user_id}
                />
              </div>
            ) : (
              userData.id === post.user_id && (
                <div className="button-container">
                  <div onClick={() => setIsUpdated(!isUpdated)}>
                    <img src="./img/edit.svg" alt="edit" />
                  </div>
                  <DeleteCard
                    post={post}
                    reloadPosts={reloadPosts}
                    id={post.user_id}
                  />
                </div>
              )
            )}
            {/* <div className="card-footer">
              <LikeButton />
            </div> */}
            <CardComments postId={post.id} />
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
