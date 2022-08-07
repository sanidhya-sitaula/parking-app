import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Stores from "./components/Stores";
import About from "./components/About";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import StoreProfile from "./components/StoreProfile";
import AddSpot from './components/AddSpot';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  withRouter,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import { authListener, getCategories, getAllStores, getAllSpaces, getReservations } from "./functions/index";
import StoreHome from "./components/StoreHome";
import Reserve from "./components/Reserve";

function App() {
  const [userDetails, setUserDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState();
  const [userLocation, setUserLocation] = useState();
  const [stores, setStores] = useState();
  const [spaces, setSpaces] = useState(); 
  const [reservations, setReservations] = useState(); 

  useEffect(async () => {
    await authListener(setLoading, setUserDetails);
    await getAllStores(setStores);
    await getAllSpaces(setSpaces); 
    await getCategories(setCategories);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) =>
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      );
    } else {
      alert("Geolocation not supported");
    }
  }, []);

  useEffect(async () => {
    if (userDetails){
      await getReservations(userDetails.email, setReservations);

    }
  },[userDetails])

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route exact path = "/" element = { <Home
                    userDetails={userDetails}
                    loading={loading}
                    userLocation={userLocation}
                    spaces = {spaces}
                    reservations = {reservations}
                  />} />
            {/* {userDetails ? (
              <Route
                exact
                path="/"
                element={
                  <StoreHome
                    userDetails={userDetails}
                    loading={loading}
                    categories={categories}
                    setUserDetails={setUserDetails}
                  />
                }
              />
            ) : (
              <Route
                exact
                path="/"
                element={
                  <Home
                    userDetails={userDetails}
                    loading={loading}
                    categories={categories}
                    stores={stores}
                    userLocation={userLocation}
                    spaces = {spaces}
                  />
                }
              />
            )} */}

            <Route
              path="/about"
              element={<About userDetails={userDetails} />}
            />
            <Route
              path="/login"
              element={<Login userDetails={userDetails} />}
            />
            {categories ? (
              <Route
                path="/signup"
                element={
                  <Signup userDetails={userDetails} categories={categories} />
                }
              />
            ) : null}
            <Route
              path="/profile/:id"
              element={<StoreProfile userLocation={userLocation} />}
            />
            <Route path = "/add_spot" element = {<AddSpot userDetails = {userDetails}/>} />
            <Route path = "/reserve/:lat/:lng" element = {<Reserve  userDetails = {userDetails} userLocation = {userLocation}/>} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
