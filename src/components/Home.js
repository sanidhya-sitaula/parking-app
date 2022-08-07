import React, { useState, useEffect } from "react";
import Header from "./Header";
import Spaces from './Spaces';
import { getDistance } from "geolib";
import BrowseCategory from "./BrowseCategory";
import Reservations from './Reservations';


const Home = (props) => {
  const { userDetails, loading, spaces, userLocation, reservations } = props;

  console.log(reservations);

  console.log(userLocation);
  console.log(spaces);

  const convertDistanceToKilometers = (distanceInMeters) => {
    return (distanceInMeters * 0.001).toFixed(2);
  };

  const getDistancesToStores = (stores) => {
    // User's Location
    const userLoc = {
      latitude: userLocation.lat,
      longitude: userLocation.lng,
    };
    // First, get distance to each store
    // stores.map((store) => {
    //   if (store.lat && store.lng) {
    //     let storeLoc = {
    //       latitude: store.lat,
    //       longitude: store.lng,
    //     };
    //     let distance = getDistance(userLoc, storeLoc, 1);
    //     store["distance_from_user"] =
    //       convertDistanceToKilometers(distance)
    //         .toString()
    //         .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " km";
    //   }
    // });

    spaces.map((space) => {
      if (space.coords) {
        let spaceLoc = {
          latitude: space.coords.lat,
          longitude: space.coords.lng,
        };
        console.log(spaceLoc);
        let distance = getDistance(userLoc, spaceLoc, 1);
        console.log("distance");
        space["distance_from_user"] =
          convertDistanceToKilometers(distance)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " km";
      }
    });
  };

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <>
          <Header
            userDetails={userDetails}
            title="Parking Pad"
            // categories={categories}
          />
          
          {userLocation ? getDistancesToStores(spaces) : null}
          {userDetails && <Reservations reservations = {reservations} userDetails = {userDetails}/> }
          <Spaces spaces = {spaces} />
          {/* <BrowseCategory stores={stores} categories={categories} /> */}
        </>
      )}
    </>
  );
};

export default Home;
