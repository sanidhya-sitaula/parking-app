import React, { useState, useEffect } from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";
import { getUserDetails } from "../functions/index";
import Loader from "react-loader-spinner";
import { Grid } from "@material-ui/core";
import MapContainer from "./SetLocation";

const StoreProfile = (props) => {
  const { id } = useParams();
  const { userLocation, categories } = props;
  const [store, setStore] = useState();

  useEffect(async () => {
    await getUserDetails(id, setStore);
  }, []);

  return (
    <>
      {store ? (
        <>
          <Header
            title={store.name}
            categories={categories}
            image={store.image}
          />

          <Grid container spacing={3}>
            <Grid
              item
              xs={5}
              className="current-location"
              style={{ marginLeft: "4%" }}
            >
              
              {/* <div className="explore-message" style={{ marginTop: "5%" }}>
                <h1>Store Location </h1>
              </div>
              <div className="mapcontainer2">
                
              </div> */}
            </Grid>
            {/* <Grid item xs={5} className="store-details">
              <div className="explore-message" style={{ marginTop: "5%" }}>
                <h1>Store Details</h1>

                <div className="selected-category">
                  <p>
                    Address: <h4>{store.address}</h4>
                  </p>
                  <p>
                    Phone: <h4>{store.phone}</h4>
                  </p>
                  Categories: <h4>{store.category.join(", ")}</h4>
                </div>
              </div>
            </Grid> */}
          </Grid>
        </>
      ) : (
        <div className="loader">
          <Loader
            type="ThreeDots"
            color="#000000"
            height="200"
            width="100"
            timeout={5000}
          />
        </div>
      )}
    </>
  );
};

export default StoreProfile;
