import "./styles.css";
import { useState } from "react";
import { useCookies } from "react-cookie";

import axios from "axios";

import visibilityPassword from "../../Assets/witness.png";
import noVisibilityPassword from "../../Assets/hidden.png";

function Authentification() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoging, setIsLoging] = useState(true);
  const [showPassword, setShowPassword] = useState(true);
  const [error, setError] = useState(false);
  const [showVisibilityPassword, setShowVisibilityPassword] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");

    if (password !== confirmPassword) {
      setError(true);
    }

    axios
      .post("http://localhost:8000/signup", {
        username,
        password,
      })
      .then((response) => {
        //Attribut cookies with the response data
        setCookie("name", response.data.username);
        setCookie("hashPassword", response.data.hashPassword);
        setCookie("userId", response.data.userId);
        setCookie("authtoken", response.data.myTokenId);
        console.log(response);

        window.location.reload();
      });
  };

  console.log(cookies);

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
            value={username}
            className="auth__container-input"
            onChange={(e) => setUsername(e.target.value)}
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
            {error ? (
              <p className="auth__container-errorPasswordText">
                Your password and confirm password don't match
              </p>
            ) : (
              ""
            )}
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
