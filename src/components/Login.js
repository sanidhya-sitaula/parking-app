import React, { useState } from "react";
import Header from "./Header";
import TextField from "@mui/material/TextField";
import { handleLogin } from "../functions";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async (
    email,
    password,
    setEmailError,
    setPasswordError
  ) => {
    await handleLogin(
      email,
      password,
      setEmailError,
      setPasswordError,
      setLoading
    );

    if (!loading) {
      navigate("/");
    }
  };

  return (
    <>
      <Header title="Login To Your Account" />
      <div className="login-form">
        <ul className="login-form-items">
          <li>
            <TextField
              required
              id="outlined-required"
              label="Email"
              defaultValue=""
              style={{ width: "600px" }}
              onChange={(e) => {
                setLoading(true);
                setEmail(e.target.value);
              }}
            />
            {emailError ? <p>{emailError}</p> : null}
          </li>
          <li>
            <TextField
              type="password"
              required
              id="outlined-required"
              label="Password"
              defaultValue=""
              style={{ width: "600px" }}
              onChange={(e) => {
                setLoading(true);
                setPassword(e.target.value);
              }}
            />
            {passwordError ? <p>{passwordError}</p> : null}
          </li>
          <li>
            <button
              className="submit-button"
              onClick={() =>
                handleSubmit(email, password, setEmailError, setPasswordError)
              }
            >
              Login
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Login;
