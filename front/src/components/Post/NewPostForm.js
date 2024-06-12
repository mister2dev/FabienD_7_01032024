import React, { useEffect, useState } from "react";
import { isEmpty } from "../Utils";
import { NavLink } from "react-router-dom";

const NewPostForm = () => {
  const userId = localStorage.getItem("userId");
  const userPicture = localStorage.getItem("userPic");
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [video, setVideo] = useState("");
  const [file, setFile] = useState();

  const handlePicture = () => {};

  const handlePost = () => {};

  return (
    <div>
      <div className="post-container">
        <>
          <NavLink exact to="/profil">
            <div className="user-info">
              <img src={userPicture} alt="user-img" />
            </div>
          </NavLink>
          <div className="post-form">
            <textarea
              name="message"
              id="message"
              placeholder="Ajouter un message"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />

            {message || postPicture || video.length > 20 ? (
              <li className="card-container">
                <div className="card-right">
                  <div className="card-header">
                    {postPicture ? <span>{postPicture.filename}</span> : null}
                    {video ? <span>{video}</span> : null}
                  </div>
                </div>
              </li>
            ) : null}

            <div className="footer-form">
              <div className="icon">
                {isEmpty(video) && (
                  <>
                    <img src="./img/pic_icon.svg" alt="img" />
                    <input
                      type="file"
                      id="file-upload"
                      name="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => handlePicture(e)}
                    />
                  </>
                )}
              </div>
              <div className="btn-send">
                <button className="send" onClick={handlePost}>
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default NewPostForm;
