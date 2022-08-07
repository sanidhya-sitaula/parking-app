import React, { useState } from "react";
import Loader from "react-loader-spinner";
import Card from "./Card";

import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

const Stores = (props) => {
  const { stores } = props

  const sortStoresAccordingToDistance = () => {
    stores.sort((a, b) =>
      a.distance_from_user > b.distance_from_user ? 1 : -1
    );
  };

  const displayStores = () => {
    sortStoresAccordingToDistance();
    return stores.map((store, index) => {
      let profileLink = `/profile/${store.email}`;
      return (
        <>
          <Grid item xs={4} key={store.name} style={{ marginBottom: "3%" }}>
            <Link className="store-profile-link" to={profileLink}>
              <Card
                title={store.name}
                subheader={store.address}
                description={store.category.join(", ")}
                distance={store.distance_from_user}
                image={store.image}
                menu={[store.email, store.phone]}
              />
            </Link>
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
        {stores ? (
          displayStores()
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

export default Stores;
