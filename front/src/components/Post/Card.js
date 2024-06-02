import React, { useEffect, useState } from "react";
import axios from "axios";
import { isEmpty } from "../Utils";

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
              alt=""
            />
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
