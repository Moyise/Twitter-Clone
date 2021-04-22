import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import Meta from "../../components/Meta";
import { reducerState } from "../../store";
import { IUserAuth } from "../../types";
import "./loadingScreen.scss";

const LoadingScreen = () => {
  const history = useHistory();

  const userLogin: IUserAuth = useSelector((state: reducerState) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push("/home");
    } else {
      history.push("/login");
    }
  }, [userInfo, history]);

  return (
    <>
      <Meta title="Loading Twitter..." />
      <div className="loadingScreen">
        <div className="loadingContainer">
          <div className="loading">
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M83.3126 27.8666C87.0477 25.6337 89.8425 22.1176 91.1751 17.975C87.6653 20.0575 83.8252 21.5245 79.8209 22.3125C74.2692 16.4397 65.473 15.0105 58.3476 18.8235C51.2221 22.6366 47.5313 30.7478 49.3376 38.625C34.9609 37.9032 21.5666 31.1121 12.4876 19.9416C7.7494 28.1142 10.1707 38.5616 18.0209 43.8166C15.1822 43.7254 12.4064 42.9568 9.92507 41.575C9.92507 41.65 9.92507 41.725 9.92507 41.8C9.92671 50.3131 15.9266 57.6461 24.2709 59.3333C21.6378 60.0497 18.8759 60.1551 16.1959 59.6416C18.5426 66.9219 25.2524 71.9095 32.9001 72.0583C26.566 77.0297 18.7437 79.7257 10.6917 79.7125C9.26453 79.7145 7.83844 79.6324 6.4209 79.4666C14.5975 84.7209 24.1141 87.5098 33.8334 87.5C47.3553 87.5929 60.3502 82.2621 69.9114 72.7001C79.4727 63.138 84.8024 50.1427 84.7084 36.6208C84.7084 35.8458 84.6903 35.075 84.6542 34.3083C88.1561 31.7775 91.1785 28.6423 93.5792 25.05C90.3168 26.4961 86.8562 27.4455 83.3126 27.8666Z"
                fill="white"
                fillOpacity="0.9"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;
