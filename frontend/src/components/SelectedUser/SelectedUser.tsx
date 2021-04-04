import React, { FunctionComponent } from "react";
import "./selectedUser.scss";

interface ISelect {
  user?: any;
  onClick(event: any): void;
}

const SelectedUser: FunctionComponent<ISelect> = ({ user, onClick }) => {
  return (
    <>
      <div className="selectedUser" onClick={() => onClick(user?._id)}>
        <img src={user?.profilePic} alt={user?.firstName} className="left" />

        <p className="middle">{user?.firstName}</p>

        <svg
          className="right"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.6582 4.16669L9.99984 8.82502L5.3415 4.16669L4.1665 5.34169L8.82484 10L4.1665 14.6584L5.3415 15.8334L9.99984 11.175L14.6582 15.8334L15.8332 14.6584L11.1748 10L15.8332 5.34169L14.6582 4.16669Z"
            fill="#1A91DA"
            fillOpacity="0.9"
          />
        </svg>
      </div>
    </>
  );
};

export default SelectedUser;
