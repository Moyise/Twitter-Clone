import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import { reducerState } from "../../store";
import { IUserAuth } from "../../types";
import "./sidebar.scss";

const Sidebar = () => {
  const dispatch = useDispatch();

  const userLogin: IUserAuth = useSelector((state: reducerState) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    //dispatch logout
    dispatch(logout());
  };

  return (
    <>
      <div className="sidebar">
        <div className="sidebarContainer">
          <div className="sidebarLogo">
            <svg
              width="32"
              height="32"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.9938 8.35999C26.1143 7.6901 26.9527 6.63528 27.3525 5.39249C26.2996 6.01724 25.1476 6.45733 23.9463 6.69374C22.2807 4.9319 19.6419 4.50314 17.5043 5.64706C15.3666 6.79097 14.2594 9.22435 14.8013 11.5875C10.4883 11.371 6.46998 9.33363 3.74627 5.98249C2.32482 8.43426 3.05121 11.5685 5.40627 13.145C4.55466 13.1176 3.72193 12.887 2.97752 12.4725C2.97752 12.495 2.97752 12.5175 2.97752 12.54C2.97801 15.0939 4.77798 17.2938 7.28127 17.8C6.49135 18.0149 5.66278 18.0465 4.85877 17.8925C5.56277 20.0766 7.57571 21.5728 9.87002 21.6175C7.96981 23.1089 5.62311 23.9177 3.20752 23.9137C2.77936 23.9144 2.35153 23.8897 1.92627 23.84C4.37926 25.4163 7.23423 26.2529 10.15 26.25C14.2066 26.2778 18.1051 24.6786 20.9734 21.81C23.8418 18.9414 25.4407 15.0428 25.4125 10.9862C25.4125 10.7537 25.4071 10.5225 25.3963 10.2925C26.4468 9.53324 27.3535 8.59267 28.0738 7.51499C27.095 7.94881 26.0569 8.23364 24.9938 8.35999Z"
                fill="white"
                fillOpacity="0.9"
              />
            </svg>
          </div>
          <ul className="sidebarLinks">
            <li className="links">
              <div className="icon">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 16.25L14.1163 4.63374C14.6044 4.14577 15.3956 4.14577 15.8837 4.63374L27.5 16.25H25V26.25C25 26.9404 24.4404 27.5 23.75 27.5H17.5V18.75H12.5V27.5H6.25C5.55964 27.5 5 26.9404 5 26.25V16.25H2.5Z"
                    fill="white"
                    fillOpacity="0.9"
                  />
                </svg>
              </div>
              <p className="label">Home</p>
            </li>
            <li className="links">
              <div className="icon">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.5 13.3374C2.5 7.35207 7.30043 2.5 13.222 2.5C16.0657 2.5 18.7929 3.6418 20.8037 5.6742C22.8145 7.70661 23.9441 10.4631 23.9441 13.3374C23.9441 19.3227 19.1437 24.1748 13.222 24.1748C7.30043 24.1748 2.5 19.3227 2.5 13.3374ZM23.7667 22.0678L26.96 24.6455H27.0155C27.6615 25.2985 27.6615 26.3572 27.0155 27.0102C26.3694 27.6632 25.322 27.6632 24.6759 27.0102L22.0259 23.9731C21.7754 23.7207 21.6345 23.378 21.6345 23.0205C21.6345 22.663 21.7754 22.3202 22.0259 22.0678C22.509 21.588 23.2835 21.588 23.7667 22.0678Z"
                    fill="white"
                    fillOpacity="0.9"
                  />
                </svg>
              </div>
              <p className="label">Explore</p>
            </li>
            <li className="links">
              <div className="icon">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 27.5C13.6201 27.4932 12.5011 26.3799 12.4875 25H17.4875C17.4901 25.3342 17.4264 25.6656 17.3 25.975C16.9721 26.7275 16.3023 27.2764 15.5 27.45H15.4938H15.475H15.4525H15.4412C15.296 27.4802 15.1483 27.497 15 27.5ZM25 23.75H5V21.25L7.5 20V13.125C7.43415 11.3614 7.83242 9.61141 8.655 8.05C9.4738 6.60189 10.8734 5.5736 12.5 5.225V2.5H17.5V5.225C20.7238 5.9925 22.5 8.7975 22.5 13.125V20L25 21.25V23.75Z"
                    fill="white"
                    fillOpacity="0.9"
                  />
                </svg>
              </div>
              <p className="label">Notifications</p>
            </li>
            <li className="links">
              <div className="icon">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25 25H5C3.61929 25 2.5 23.8807 2.5 22.5V7.39125C2.55826 6.05319 3.66067 4.99873 5 5H25C26.3807 5 27.5 6.11929 27.5 7.5V22.5C27.5 23.8807 26.3807 25 25 25ZM5 9.835V22.5H25V9.835L15 16.5L5 9.835ZM6 7.5L15 13.5L24 7.5H6Z"
                    fill="white"
                    fillOpacity="0.9"
                  />
                </svg>
              </div>
              <p className="label">Messages</p>
            </li>
            <li className="links">
              <div className="icon">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M21.6175 9.11382C21.6175 12.7851 18.6739 15.7289 15 15.7289C11.3274 15.7289 8.38251 12.7851 8.38251 9.11382C8.38251 5.44253 11.3274 2.5 15 2.5C18.6739 2.5 21.6175 5.44253 21.6175 9.11382ZM15 27.5C9.57797 27.5 5 26.6187 5 23.2187C5 19.8174 9.60673 18.9674 15 18.9674C20.4233 18.9674 25 19.8487 25 23.2487C25 26.65 20.3933 27.5 15 27.5Z"
                    fill="white"
                    fillOpacity="0.9"
                  />
                </svg>
              </div>
              <p className="label">Profile</p>
            </li>
            <li className="links" onClick={logoutHandler}>
              <div className="icon">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.75 26.25H6.25C4.86929 26.25 3.75 25.1307 3.75 23.75V18.75H6.25V23.75H23.75V6.25H6.25V11.25H3.75V6.25C3.75 4.86929 4.86929 3.75 6.25 3.75H23.75C25.1307 3.75 26.25 4.86929 26.25 6.25V23.75C26.25 25.1307 25.1307 26.25 23.75 26.25ZM13.75 20V16.25H3.75V13.75H13.75V10L20 15L13.75 20Z"
                    fill="white"
                    fillOpacity="0.9"
                  />
                </svg>
              </div>
              <p className="label">Log out</p>
            </li>
            <li className="lastLink">
              <div className="profile">
                <img src={userInfo?.profilePic} alt="profile" />
              </div>
              <div className="label">
                <p>{userInfo?.firstName}</p>
                <p className="bottom">@{userInfo?.username}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
