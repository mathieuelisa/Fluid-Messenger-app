import { useState } from "react";
import "./styles.css";

import visibilityPassword from "../../Assets/witness.png";
import noVisibilityPassword from "../../Assets/hidden.png";

function Authentification() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoging, setIsLoging] = useState(true);
  const [showPassword, setShowPassword] = useState(true);
  const [showVisibilityPassword, setShowVisibilityPassword] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted");

    console.log(userName);
    console.log(password);
    console.log(confirmPassword);
  };

  const passwordVisibility = () => {
    setShowPassword((showPassword) => !showPassword);
    setShowVisibilityPassword(
      (showVisibilityPassword) => !showVisibilityPassword
    );
  };

  return (
    <div className="auth__container">
      <h1 className="auth__container-mainTitle">FLUID MESSENGER</h1>
      <form className="auth__container-form" onSubmit={handleSubmit}>
        <label className="auth__container-label">
          Username
          <input
            type="text"
            value={userName}
            className="auth__container-input"
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>

        <label className="auth__container-label">
          Password
          <div className="auth__container-inputContainer">
            <input
              type={showPassword ? "password" : "text"}
              value={password}
              className="auth__container-input"
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              src={
                !showVisibilityPassword
                  ? noVisibilityPassword
                  : visibilityPassword
              }
              className="auth__container-passwordVisibility"
              onClick={passwordVisibility}
              alt="Visibilty password"
            />
          </div>
        </label>

        {!isLoging && (
          <label className="auth__container-label">
            Confirm password
            <div className="auth__container-inputContainer">
              <input
                type={showPassword ? "password" : "text"}
                value={confirmPassword}
                className="auth__container-input"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <img
                src={
                  showVisibilityPassword
                    ? visibilityPassword
                    : noVisibilityPassword
                }
                className="auth__container-passwordVisibility"
                onClick={passwordVisibility}
                alt="Visibilty password"
              />
            </div>
          </label>
        )}

        <button type="submit" className="button-validate">
          NEXT
        </button>
      </form>
      <div className="auth__container-buttons">
        <button
          onClick={() => setIsLoging(true)}
          className="button-login"
          style={{ color: !isLoging ? "" : "white" }}
        >
          Login
        </button>
        <button
          onClick={() => setIsLoging(false)}
          className="button-signup"
          style={{ color: isLoging ? "" : "white" }}
        >
          Signup
        </button>
      </div>
    </div>
  );
}

export default Authentification;
