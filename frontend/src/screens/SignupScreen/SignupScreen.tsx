import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./signupScreen.scss";

const SignupScreen = () => {
  const [eyeOpen1, setEyeOpen1] = useState(false);
  const [eyeOpen2, setEyeOpen2] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleEye1 = () => {
    setEyeOpen1(!eyeOpen1);
  };
  const handleEye2 = () => {
    setEyeOpen2(!eyeOpen2);
  };

  const submitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.trim() && firstName.trim() && lastName.trim() && username.trim()) {
      if (password !== confirmPassword) {
        setMessage("Passwords do not match");
      } else {
        //DISPATCH_SIGNUP
        //dispatch(signup(firstName, lastName, username, email.toLowerCase(), password));
      }
    } else {
      setMessage("Make sure each field has a valid value.");
    }
  };

  return (
    <div>
      <div className="signupScreen">
        <div className="signupBackground">
          <div className="signupContainer">
            <div className="signupLogo">
              <svg
                width="73"
                height="73"
                viewBox="0 0 73 73"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M47.4083 14.4696L64.4981 31.5595C66.2259 33.2869 67.3428 35.5309 67.6792 37.9508C68.0157 40.3708 67.5534 42.8344 66.3624 44.9676C65.1715 47.1009 63.317 48.7873 61.0805 49.7708C58.844 50.7543 56.3476 50.9811 53.9705 50.4169V51.0609C53.9705 52.7307 53.3071 54.3322 52.1263 55.513C50.9456 56.6938 49.3441 57.3571 47.6742 57.3571H40.4107V55.2036C40.4114 53.0128 39.543 50.9111 37.9961 49.3598C36.4491 47.8084 34.3499 46.9341 32.1591 46.9286H28.0138C27.4952 46.9286 26.9978 47.1346 26.6311 47.5013C26.2644 47.868 26.0584 48.3653 26.0584 48.8839C26.0584 49.4025 26.2644 49.8999 26.6311 50.2666C26.9978 50.6333 27.4952 50.8393 28.0138 50.8393H32.1591C34.5499 50.8393 36.5026 52.7946 36.5026 55.2036V57.3571H19.2903C18.4656 57.3565 17.6491 57.1928 16.8879 56.8757C16.1266 56.5585 15.4356 56.094 14.8544 55.509C14.2732 54.9239 13.8133 54.2297 13.5012 53.4664C13.1891 52.703 13.0309 51.8856 13.0357 51.0609V42.8484C13.0357 42.2383 13.0748 41.6387 13.1478 41.0495C11.7689 41.1299 10.3945 40.8278 9.1764 40.1764C7.95833 39.525 6.94395 38.5496 6.24525 37.3581C5.54655 36.1665 5.1907 34.805 5.217 33.424C5.24329 32.0429 5.6507 30.696 6.39425 29.5319C7.1378 28.3678 8.18857 27.4317 9.43055 26.8272C10.6725 26.2226 12.0574 25.973 13.4323 26.1059C14.8072 26.2388 16.1187 26.749 17.2219 27.5803C18.3251 28.4115 19.1771 29.5314 19.6839 30.8164C21.8505 29.4607 24.4133 28.6786 27.1612 28.6786H39.8033C41.7039 28.6786 43.5158 29.0514 45.174 29.7319C45.6876 28.8637 46.3159 28.1285 47.0511 27.3698L40.7783 21.0996C40.343 20.6643 39.9977 20.1475 39.7621 19.5787C39.5265 19.0099 39.4052 18.4003 39.4052 17.7846C39.4052 16.5413 39.8991 15.3488 40.7783 14.4696C41.6575 13.5905 42.85 13.0965 44.0933 13.0965C45.3367 13.0965 46.5291 13.5905 47.4083 14.4696V14.4696Z"
                  fill="white"
                  fillOpacity="0.9"
                />
              </svg>
            </div>
            <h1 className="signupTitle">Create your account</h1>
            <form className="signupForm" onSubmit={submitHandler}>
              <div className="signupFormGroup">
                <label className="formLabel">First name</label>
                <div className="formInputWrap">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="formInput"
                    required
                    maxLength={50}
                  />
                </div>
              </div>
              <div className="signupFormGroup">
                <label className="formLabel">Last name</label>
                <div className="formInputWrap">
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="formInput"
                    required
                    maxLength={50}
                  />
                </div>
              </div>
              <div className="signupFormGroup">
                <label className="formLabel">Username</label>
                <div className="formInputWrap">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="formInput"
                    required
                    maxLength={50}
                  />
                </div>
              </div>
              <div className="signupFormGroup">
                <label className="formLabel">Email</label>
                <div className="formInputWrap">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="formInput"
                    required
                    maxLength={50}
                  />
                </div>
              </div>
              <div className="signupFormGroup">
                <label className="formLabel">Password</label>
                <div className="formInputWrap">
                  <input
                    type={eyeOpen1 ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="formInput"
                    required
                  />
                  <div className="imageWrap" onClick={handleEye1}>
                    {eyeOpen1 ? (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 4.40002C3.439 4.40002 0 9.23202 0 10C0 10.766 3.439 15.6 10 15.6C16.56 15.6 20 10.766 20 10C20 9.23202 16.56 4.40002 10 4.40002ZM10 14.307C7.545 14.307 5.555 12.379 5.555 10C5.555 7.62102 7.545 5.69102 10 5.69102C12.455 5.69102 14.444 7.62102 14.444 10C14.444 12.379 12.455 14.307 10 14.307ZM10 10C9.593 9.55302 10.663 7.84602 10 7.84602C8.772 7.84602 7.777 8.81102 7.777 10C7.777 11.189 8.772 12.154 10 12.154C11.227 12.154 12.223 11.189 12.223 10C12.223 9.45302 10.346 10.379 10 10Z"
                          fill="white"
                          fillOpacity="0.9"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.8417 11.1584C16.3087 9.9534 17.2597 8.23327 17.5 6.35008C17.5131 6.24064 17.5046 6.12969 17.4748 6.02356C17.4451 5.91743 17.3947 5.8182 17.3266 5.73153C17.2585 5.64487 17.174 5.57246 17.078 5.51845C16.9819 5.46444 16.8761 5.42988 16.7667 5.41675C16.6572 5.40361 16.5463 5.41216 16.4401 5.44191C16.334 5.47166 16.2348 5.52202 16.1481 5.59011C16.0615 5.65821 15.989 5.74271 15.935 5.83879C15.881 5.93487 15.8465 6.04064 15.8333 6.15008C15.6341 7.55532 14.9343 8.8414 13.8626 9.77189C12.7909 10.7024 11.4193 11.2147 10 11.2147C8.58071 11.2147 7.20912 10.7024 6.13741 9.77189C5.06569 8.8414 4.36589 7.55532 4.16666 6.15008C4.15353 6.04064 4.11897 5.93487 4.06496 5.83879C4.01095 5.74271 3.93854 5.65821 3.85188 5.59011C3.76521 5.52202 3.66598 5.47166 3.55985 5.44191C3.45372 5.41216 3.34277 5.40361 3.23333 5.41675C3.1239 5.42988 3.01812 5.46444 2.92204 5.51845C2.82596 5.57246 2.74146 5.64487 2.67336 5.73153C2.60527 5.8182 2.55491 5.91743 2.52516 6.02356C2.49542 6.12969 2.48686 6.24064 2.5 6.35008C2.73819 8.23203 3.6861 9.95198 5.15 11.1584L3.23333 13.0917C3.09681 13.2512 3.02547 13.4562 3.03357 13.666C3.04167 13.8757 3.12862 14.0746 3.27703 14.223C3.42544 14.3715 3.62439 14.4584 3.83412 14.4665C4.04385 14.4746 4.24891 14.4033 4.40833 14.2667L6.58333 12.1001C7.3915 12.5085 8.26655 12.7682 9.16666 12.8667V15.8334C9.16666 16.0544 9.25446 16.2664 9.41074 16.4227C9.56702 16.5789 9.77898 16.6667 10 16.6667C10.221 16.6667 10.433 16.5789 10.5893 16.4227C10.7455 16.2664 10.8333 16.0544 10.8333 15.8334V12.8667C11.7335 12.7682 12.6085 12.5085 13.4167 12.1001L15.5917 14.2667C15.7511 14.4033 15.9561 14.4746 16.1659 14.4665C16.3756 14.4584 16.5746 14.3715 16.723 14.223C16.8714 14.0746 16.9583 13.8757 16.9664 13.666C16.9745 13.4562 16.9032 13.2512 16.7667 13.0917L14.8417 11.1584Z"
                          fill="white"
                          fillOpacity="0.9"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
              <div className="signupFormGroup">
                <label className="formLabel">Re-enter password</label>
                <div className="formInputWrap">
                  <input
                    type={eyeOpen2 ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="formInput"
                    required
                  />
                  <div className="imageWrap" onClick={handleEye2}>
                    {eyeOpen2 ? (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 4.40002C3.439 4.40002 0 9.23202 0 10C0 10.766 3.439 15.6 10 15.6C16.56 15.6 20 10.766 20 10C20 9.23202 16.56 4.40002 10 4.40002ZM10 14.307C7.545 14.307 5.555 12.379 5.555 10C5.555 7.62102 7.545 5.69102 10 5.69102C12.455 5.69102 14.444 7.62102 14.444 10C14.444 12.379 12.455 14.307 10 14.307ZM10 10C9.593 9.55302 10.663 7.84602 10 7.84602C8.772 7.84602 7.777 8.81102 7.777 10C7.777 11.189 8.772 12.154 10 12.154C11.227 12.154 12.223 11.189 12.223 10C12.223 9.45302 10.346 10.379 10 10Z"
                          fill="white"
                          fillOpacity="0.9"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.8417 11.1584C16.3087 9.9534 17.2597 8.23327 17.5 6.35008C17.5131 6.24064 17.5046 6.12969 17.4748 6.02356C17.4451 5.91743 17.3947 5.8182 17.3266 5.73153C17.2585 5.64487 17.174 5.57246 17.078 5.51845C16.9819 5.46444 16.8761 5.42988 16.7667 5.41675C16.6572 5.40361 16.5463 5.41216 16.4401 5.44191C16.334 5.47166 16.2348 5.52202 16.1481 5.59011C16.0615 5.65821 15.989 5.74271 15.935 5.83879C15.881 5.93487 15.8465 6.04064 15.8333 6.15008C15.6341 7.55532 14.9343 8.8414 13.8626 9.77189C12.7909 10.7024 11.4193 11.2147 10 11.2147C8.58071 11.2147 7.20912 10.7024 6.13741 9.77189C5.06569 8.8414 4.36589 7.55532 4.16666 6.15008C4.15353 6.04064 4.11897 5.93487 4.06496 5.83879C4.01095 5.74271 3.93854 5.65821 3.85188 5.59011C3.76521 5.52202 3.66598 5.47166 3.55985 5.44191C3.45372 5.41216 3.34277 5.40361 3.23333 5.41675C3.1239 5.42988 3.01812 5.46444 2.92204 5.51845C2.82596 5.57246 2.74146 5.64487 2.67336 5.73153C2.60527 5.8182 2.55491 5.91743 2.52516 6.02356C2.49542 6.12969 2.48686 6.24064 2.5 6.35008C2.73819 8.23203 3.6861 9.95198 5.15 11.1584L3.23333 13.0917C3.09681 13.2512 3.02547 13.4562 3.03357 13.666C3.04167 13.8757 3.12862 14.0746 3.27703 14.223C3.42544 14.3715 3.62439 14.4584 3.83412 14.4665C4.04385 14.4746 4.24891 14.4033 4.40833 14.2667L6.58333 12.1001C7.3915 12.5085 8.26655 12.7682 9.16666 12.8667V15.8334C9.16666 16.0544 9.25446 16.2664 9.41074 16.4227C9.56702 16.5789 9.77898 16.6667 10 16.6667C10.221 16.6667 10.433 16.5789 10.5893 16.4227C10.7455 16.2664 10.8333 16.0544 10.8333 15.8334V12.8667C11.7335 12.7682 12.6085 12.5085 13.4167 12.1001L15.5917 14.2667C15.7511 14.4033 15.9561 14.4746 16.1659 14.4665C16.3756 14.4584 16.5746 14.3715 16.723 14.223C16.8714 14.0746 16.9583 13.8757 16.9664 13.666C16.9745 13.4562 16.9032 13.2512 16.7667 13.0917L14.8417 11.1584Z"
                          fill="white"
                          fillOpacity="0.9"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
              <p className="errorMessage">{message}</p>
              <button type="submit" className="formSubmit">
                Sign up
              </button>
            </form>
            <p className="bottomLinks">
              <span>Already have an account?</span>
              <Link to="/login" className="link">
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupScreen;
