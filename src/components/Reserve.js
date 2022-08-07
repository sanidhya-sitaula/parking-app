import React, {useState, useEffect} from 'react'; 
import Header from './Header'; 
import { useParams } from "react-router-dom";
import {getSpotDetails} from '../functions/index';
import NewCard from './NewCard';
import { getDistance } from "geolib";
import { Grid } from '@mui/material';
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";

import {reserveSpace} from '../functions/index';

const Reserve = (props) => {
    
    const {userDetails, userLocation} = props; 


    let {lat, lng} = useParams();

    const spaceLink = `/reserveSpace/lat=${lat}/lng=${lng}/byUser=${userDetails.email}`;


    lat = lat.split('=')[1];
    lng = lng.split('=')[1];

    const [spotDetails, setSpotDetails] = useState();
    const [vehicleType, setVehicleType] = useState();
    const [plateNo, setPlateNo] = useState();


    const convertDistanceToKilometers = (distanceInMeters) => {
        return (distanceInMeters * 0.001).toFixed(2);
      };
    
    const getDistancesToSpace = (spotDetails) => {
        // User's Location
        const userLoc = {
          latitude: userLocation.lat,
          longitude: userLocation.lng,
        };
    
          if (spotDetails.coords.lat && spotDetails.coords.lng) {
            let spaceLoc = {
              latitude: spotDetails.coords.lat,
              longitude: spotDetails.coords.lng,
            };
            let distance = getDistance(userLoc, spaceLoc, 1);
            spotDetails["distance_from_user"] =
              convertDistanceToKilometers(distance)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " km";
            setSpotDetails(spotDetails);
          }
       
      };

      const handleReserve = async () => {
        await reserveSpace(lat, lng, userDetails.email, spotDetails.price, spotDetails.available_start, spotDetails.available_end, spotDetails.address, spotDetails.email, vehicleType, plateNo); 
        window.location.replace('/');
      }
    

    useEffect(async () => {
        await getSpotDetails(lat, lng, setSpotDetails);

    }, [])

    return (
        <>
            <Header title = "Reserve" userDetails = {userDetails} />
            {spotDetails &&
            <>
                 <div style = {{marginTop: '4%'}}>
                        <NewCard 
                        address = {spotDetails.address}
                        description = {spotDetails.description}
                        price = {spotDetails.price}
                        availability_start = {spotDetails.available_start}
                        availability_end = {spotDetails.available_end}
                        image = {spotDetails.image}
                        lat = {spotDetails.coords.lat}
                        lng = {spotDetails.coords.lng}
                        reserve = {true}
                        style = {{width: '100%', marginBottom: '5%'}}
                    />
                </div>
                <>
                        <ul style = {{listStyle: "none"}}>
                            <li style = {{marginBottom: '2%'}}>
                                <TextField
                                required
                                id="outlined-required"
                                label="Vehicle Type (SUV, Sedan, etc.)"
                                defaultValue=""
                                style={{ width: "100%" }}
                                onChange={(e) => {setVehicleType(e.target.value)}}
                                />
                            </li>
                            <li style = {{marginBottom: '2%'}}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Plate Number"
                                    defaultValue=""
                                    style={{ width: "100%" }}
                                    onChange={(e) => {setPlateNo(e.target.value)}}
                                    />
                            </li>
                            <li>
                            <Link to = {spaceLink}>
                                <button onClick = {handleReserve}>Reserve</button>
                             </Link>
                            </li>
                            </ul>

                </>
            </>
        }
        </>

            
    )
}

export default Reserve; 