import React, { useState } from "react";
import Loader from "react-loader-spinner";
import Card from "./Card";
import NewCard from './NewCard';

import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

const Spaces = (props) => {
  const { spaces } = props

  const sortSpacesAccordingToDistance = () => {
    spaces.sort((a, b) =>
      a.distance_from_user > b.distance_from_user ? -1 : 1
    );
  };

  const displaySpaces = () => {
    sortSpacesAccordingToDistance();
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
                lat = {space.coords.lat}
                lng = {space.coords.lng}
                type = {space.type}
              />
          </Grid>
        </>
      );
    });
  };

  return (
    <div className="stores">
      <div className="explore-message">
        <h1>Parking Spots Closest To You</h1>
      </div>
      <Grid container spacing={1}>
        {spaces ? (
          displaySpaces()
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
    </div>
  );
};

export default Spaces;
