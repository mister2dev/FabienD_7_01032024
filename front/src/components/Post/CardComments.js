import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { commentDateParser, isEmpty } from "../Utils";
import DeleteComment from "./DeleteComment";

const CardComments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [userData, setUserData] = useState([]);
  const userId = localStorage.getItem("userId");

  const getUsersData = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/user/`)
      .then((res) => {
        setUsersData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const getUserData = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/user/` + userId)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => console.log(err));
  }, [userId]);

  const getComments = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/comment/` + postId)
      .then((res) => {
        console.log("res.data", res.data);
        setComments(res.data);
      })
      .catch((err) => console.log(err));
  }, [postId]);

  useEffect(() => {
    getUsersData();
    getUserData();
    getComments();
  }, [getUsersData, getUserData, getComments]);

  const handleComment = (e) => {
    e.preventDefault();
    if (text) {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/comment/`,
        data: {
          user_id: userId,
          post_id: postId,
          content: text,
        },
      })
        .then((res) => {
          setText(""); // Clear the input field
          getComments(); // Refresh the comments list
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="comments-container">
      {comments.map((comment) => (
        <div className="comment-container" key={comment.id}>
          <div className="left-part">
            <img
              src={
                (!isEmpty(usersData) &&
                  usersData
                    .filter((user) => user.id === comment.user_id)
                    .map((user) => user.attachment)
                    .join("")) ||
                undefined
              }
              alt="comment-pic"
            />
          </div>
          <div className="right-part">
            <div className="comment-header">
              <div className="pseudo">
                {!isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user.id === comment.user_id) return user.username;
                      else return null;
                    })
                    .join("")}
              </div>
              <span>{commentDateParser(comment.createdAt)}</span>
            </div>
            <p>{comment.content}</p>
            <DeleteComment
              comment={comment}
              postId={postId}
              reloadComments={getComments}
            />
          </div>
        </div>
      ))}
      {userId && (
        <form action="" onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Laisser un commentaire"
          />
          <br />
          <input type="submit" value="Envoyer" />
        </form>
      )}
    </div>
  );
};
export default CardComments;
