import React, { useEffect, useState } from "react";
import axios from "axios";
import { dateParser, isEmpty } from "../Utils";
import LikeButton from "./LikeButton";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [usersData, setUsersData] = useState([]);

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
            <p>{post.content}</p>
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
