import React from "react";
import { useHistory } from "react-router-dom";
import "./notFoundScreen.scss";

const NotFoundScreen = () => {
  const history = useHistory();

  return (
    <>
      <div className="notFoundScreen">
        <div className="notFoundTop">
          <div className="icon" onClick={() => history.push("/home")}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.83 11L11.41 7.41L10 6L4 12L10 18L11.41 16.59L7.83 13H20V11H7.83Z"
                fill="#1A91DA"
              />
            </svg>
          </div>
          <p>Not found</p>
        </div>
        <div className="notFoundCenter">
          <p className="title">Sorry, that page doesn’t exist!</p>
          <p className="desc">
            Why not try a{" "}
            <span onClick={() => history.push("/search/posts")}>search</span> to find
            something else?
          </p>
        </div>
      </div>
    </>
  );
};

export default NotFoundScreen;
