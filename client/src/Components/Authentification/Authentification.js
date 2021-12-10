import { useState } from "react";

function Authentification() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted");

    console.log(userName);
    console.log(password);
    console.log(confirmPassword);
  };

  return (
    <div className="auth__container">
      <form className="auth__container-form" onSubmit={handleSubmit}>
        <label>
          Username
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>

        <label>
          Password
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <label>
          Confirm password
          <input
            type="text"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <button type="submit">Go</button>
      </form>
    </div>
  );
}

export default Authentification;
