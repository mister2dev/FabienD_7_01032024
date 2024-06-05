import React, { useEffect, useState } from "react";
import axios from "axios";
import { dateParser, isEmpty } from "../Utils";
import LikeButton from "./LikeButton";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [usersData, setUsersData] = useState([]);
  const [userData, setUserData] = useState([]);
  const userId = localStorage.getItem("userId");
  const [attachmentUpdate, setAttachmentUpdate] = useState(null);

  const updateItem = () => {
    if (textUpdate) {
      setAttachmentUpdate(post.attachment);
      console.log("post", post);
      return axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}api/post/${post.id}`,
        data: { attachmentUpdate, content: textUpdate },
      })
        .then((res) => {
          console.log("res.data de updateItem :", res.data);
        })
        .catch((err) => console.log(err));
    }
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
            {post.video && (
              <iframe
                width="500"
                height="300"
                src={post.video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={post._id}
              ></iframe>
            )}
            {userData.id === post.user_id && (
              <div className="button-container">
                <div onClick={() => setIsUpdated(!isUpdated)}>
                  <img src="./img/edit.svg" alt="edit" />
                </div>
                {/* <DeleteCard id={post.user_id} /> */}
              </div>
            )}
            <div className="card-footer">
              <LikeButton />
            </div>
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
