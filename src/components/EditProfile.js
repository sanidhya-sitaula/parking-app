import React, { useState } from "react";
import MultipleSelect from "./MultiSelect";
import {useNavigate} from 'react-router-dom';
import TextField from "@mui/material/TextField";
import {handleEditProfile} from '../functions/index';

const EditProfile = (props) => {
  const { userDetails, categories } = props;

  const [name, setName] = useState(userDetails.name);
  const [phone, setPhone] = useState(userDetails.phone);
  const [address, setAddress] = useState(userDetails.address);
  const [category, setCategory] = useState(userDetails.category);
  const [loading, setLoading] = useState(false);


  const handleEditSubmit = async (name, phone, address, category) => {
      let editedDetails = {name : name, phone : phone, address : address, category: category}
      setLoading(true);
      await handleEditProfile(userDetails.email, editedDetails);
      setLoading(false);
      alert('Profile Changed Successfully.')
    };



  return (
    <>
      <div className="login-form2">
        <div className="explore-message">
          <h1>Edit Your Profile</h1>
        </div>
        <ul className="login-form-items">
          <li>
            <TextField
              required
              id="outlined-required"
              label="Name"
              defaultValue={userDetails.name}
              style={{ width: "600px" }}
              onChange={(e) => setName(e.target.value)}
            />
          </li>
          <li>
            <TextField
              required
              id="outlined-required"
              label="Email"
              defaultValue={userDetails.email}
              style={{ width: "600px" }}
              disabled
            />
          </li>
          <li>
            <TextField
              required
              id="outlined-required"
              label="Phone"
              defaultValue={userDetails.phone}
              style={{ width: "600px" }}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </li>
          <li>
            {categories ? (
              <div style={{ marginLeft: "-1%" }}>
                <MultipleSelect
                  categories={categories}
                  defaultCategories={userDetails.category}
                  setCategory={setCategory}
                  category = {category}
                />
              </div>
            ) : (
              "Loading.."
            )}
          </li>
          <li>
            <TextField
              required
              id="outlined-required"
              label="Address"
              defaultValue={userDetails.address}
              style={{ width: "600px" }}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </li>

          <li>
            <button
              className="submit-button"
              onClick={() => handleEditSubmit(name, phone, address, category)}
            >
              {!loading ? 'Edit Profile' : 'Loading...' } 
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};
export default EditProfile;
