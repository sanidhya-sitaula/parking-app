import React, { useState } from "react";
import Header from "./Header";
import TextField from "@mui/material/TextField";
import { handleSignUp, handleSignup, handleSubmitSpot } from "../functions/index";
import { useNavigate } from "react-router-dom";
import fire from "../fire";
import 'firebase/storage';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FormControl } from "@mui/material";
import { Grid } from "@material-ui/core";
import MapContainer from './SetLocation';


const AddSpot = (props) => {
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [available_start, setAvailableStart] = useState("");
  const [available_end, setAvailableEnd] = useState("");
  const [coords, setCoords] = useState("");

  

  const { userDetails, categories } = props;

  const navigate = useNavigate();

  const handleSubmit = async (
      address,
      coords,
      available_start,
      available_end,
      price,
      description,
      type,
  ) => {
      await handleSubmitSpot(
        userDetails.email,
        address,
        coords,
        available_start,
        available_end,
        price,
        description,
        type,
      );
      window.location.replace("/");
  }

  return (
    <>
      <Header title="Add A New Parking Spot" userDetails = {userDetails}/>
      <Grid container spacing = {2}>
          <Grid item xs = {6}>
          <div className="login-form">
        <ul className="login-form-items">
          <li>
            <TextField
              required
              id="outlined-required"
              label="Address"
              defaultValue=""
              style={{ width: "600px" }}
              onChange={(e) => setAddress(e.target.value)}
            />
          </li>
          <li>
            <label class = "aval-form">Availability Start</label>
            <input type = "datetime-local" id = "" value = {available_start} onChange = {(e) => setAvailableStart(e.target.value)} />
          </li>
          <li>
            <label class = "aval-form">Availability End</label>
            <input type = "datetime-local" id = "" value = {available_end} onChange = {(e) => setAvailableEnd(e.target.value)}/>
          </li>
    
          <li>
              <FormControl>
          <InputLabel>Type</InputLabel>

            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Type"
                labelWidth={ "text".length * 9}
                value={type}
                style = {{width: "600px"}}
                onChange={(e) => {setType(e.target.value)}}
            >
            <MenuItem value={"Driveway"}>Driveway</MenuItem>
            <MenuItem value={"Parking Lot"}>Parking Lot</MenuItem>
            <MenuItem value={"House"}>House</MenuItem>
        </Select>  
        </FormControl>          
          </li>
          <li>
            <TextField
              required
              id="outlined-required"
              label="Price"
              defaultValue=""
              style={{ width: "600px" }}
              onChange={(e) => setPrice(e.target.value)}
            />
          </li>
          <li>
            <TextField
              required
              id="outlined-required"
              label="Description"
              defaultValue=""
              style={{ width: "600px" }}
              onChange={(e) => setDescription(e.target.value)}
            />
          </li>
          <li>
            <button
              className="submit-button"
              onClick={() =>
                handleSubmit(
                    address,
                    coords,
                    available_start,
                    available_end,
                    price,
                    description,
                    type                )
              }
            >
              Add Spot
            </button>
          </li>
        </ul>
      </div>
          </Grid>
          <Grid item xs = {6} style = {{marginTop: "2%"}}>
              <MapContainer 
                   lat={0}
                   lng={0}
                   storeName={""}
                   setLatLng = {setCoords}
                   />
          </Grid>
     
      </Grid>

    </>
  );
};

export default AddSpot;
