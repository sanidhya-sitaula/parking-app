import React, { useState } from "react";
import Header from "./Header";
import MapContainer from "./SetLocation";
import { handleSetLocation } from "../functions/index";
import { getUserDetails } from "../functions/index";
import { Grid } from "@material-ui/core";
import EditProfile from "./EditProfile";

const StoreHome = (props) => {
  const { userDetails, categories, setUserDetails } = props;
  const [latlng, setLatLng] = useState();

  const handleOnClick = async (email, latlng) => {
    await handleSetLocation(email, latlng);
    await getUserDetails(email, setUserDetails);
  };

  return (
    <>
      <Header
        userDetails={userDetails}
        title="Store Finder"
        categories={categories}
      />
      {!userDetails.lat && !userDetails.lng ? (
        <div className="explore-message">
          <h1>First of all, set your location!</h1>
          <p style={{ marginTop: "3%" }}>
            Your users can't find you until you set your location on the map.
          </p>
          <div className="mapcontainer">
            <MapContainer setLatLng={setLatLng} />
          </div>
          <button
            className="submit-button"
            style={{ marginTop: "2%" }}
            onClick={() => handleOnClick(userDetails.email, latlng)}
          >
            Set Location on Map
          </button>
        </div>
      ) : (
        <>
          <Grid container spacing={3}>
            <Grid
              item
              xs={5}
              className="current-location"
              style={{ marginLeft: "4%" }}
            >
              <div className="explore-message">
                <h1>Your Current Location is: </h1>
              </div>
              <div className="mapcontainer2">
                <MapContainer
                  lat={userDetails.lat}
                  lng={userDetails.lng}
                  storeName={userDetails.name}
                  setLatLng = {setLatLng}
                />
              </div>
            </Grid>
            <Grid item xs={7}>
              <EditProfile
                userDetails={userDetails}
                categories={categories}
                defaultCategories={userDetails.category}
              />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default StoreHome;
