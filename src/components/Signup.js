import React, { useState } from "react";
import Header from "./Header";
import TextField from "@mui/material/TextField";
import { handleSignUp, handleSignup } from "../functions/index";
import { useNavigate } from "react-router-dom";
import fire from "../fire";
import 'firebase/storage';

import MultipleSelect from "./MultiSelect";
const Signup = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [emailError, setEmailError] = useState();
  const [category, setCategory] = useState("");
  const [passwordError, setPasswordError] = useState();
  const [fileURL, setFileURL] = useState({});

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = fire.storage().ref();
    if (file){
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file);
      setFileURL(await fileRef.getDownloadURL());
    }
  };

  const { userDetails, categories } = props;

  const navigate = useNavigate();

  const handleSubmit = async (
    email,
    password,
    setEmailError,
    setPasswordError
  ) => {
    
    await handleSignUp(
      email,
      password,
      setEmailError,
      setPasswordError
    );
    navigate("/");
  };

  return (
    <>
      <Header title="Sign Up For A New Account" />
      <div className="login-form">
        <ul className="login-form-items">
      
          <li>
            <TextField
              required
              id="outlined-required"
              label="Email"
              defaultValue=""
              style={{ width: "600px" }}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError ? <p>{passwordError}</p> : null}
          </li>
    

          <li>
            <button
              className="submit-button"
              onClick={() =>
                handleSubmit(              
                  email,
                  password,
                  setEmailError,
                  setPasswordError
                )
              }
            >
              Sign Up
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Signup;
