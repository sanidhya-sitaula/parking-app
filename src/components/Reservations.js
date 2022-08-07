import React, { useState , useEffect} from "react";
import Loader from "react-loader-spinner";
import Card from "./Card";
import NewCard from './NewCard';

import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { getReservations } from "../functions";

const Reservations = (props) => {
  const { reservations, userDetails } = props

  console.log('reservations', reservations);


  const displayReservations = (spaces) => {
    return spaces.map((space, index) => {
      let profileLink = `/profile/${space.owned_by}`;
      return (
        <>
          <Grid item xs={6} key={space.address} style={{ marginBottom: "3%" }}>
              <NewCard 
                address = {space.address}
                distance_from_user = {space.distance_from_user}
                description = {space.description}
                price = {space.price}
                availability_start = {space.available_start}
                availability_end = {space.available_end}
                image = {space.image}
                lat = {parseFloat(space.coords.lat)  }
                lng = {parseFloat(space.coords.lng)}
                reserve = {true}
                ownSpot = {space.ownedBy == userDetails.email}
                vehicle_type = {space.vehicle_type}
                vehicle_num = {space.vehicle_num}
              />
          </Grid>
        </>
      );
    });
  };

  return (
    <div className="stores">
        {userDetails &&    
        <>
        <div className="explore-message">
        <h1>Your Current Reservations</h1>
      </div>
      <Grid container spacing={1}>
        {reservations ? (
          displayReservations(reservations)
        ) : (
          <Loader
            type="ThreeDots"
            color="#000000"
            height="100"
            width="100"
            timeout={5000}
          />
        )}
      </Grid>
      <div className="border" />
      </>
      }
   
    </div>
  );
};

export default Reservations;
