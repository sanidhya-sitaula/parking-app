import React from 'react'; 
import './NewCard.css';
import { Link } from "react-router-dom";
import MapContainer from './SetLocation';
import { getUserDetails } from '../functions';


const NewCard = (props) => {

    const { address, owned_by, description, distance_from_user, price, availability_start, availability_end, lat, lng, type, ownSpot, vehicle_type, vehicle_num } = props; 

    const spaceLink = `/reserve/lat=${lat}/lng=${lng}`;

    console.log('start:', availability_start);
    console.log('end: ', availability_end); 

    const getParsedDate = (thisDate) => {
        console.log('thisDate: ', thisDate);
        let date = Date(thisDate); 
        console.log('date: ', date);
        let splits = date.split(' ');
        let weekDay = splits[0];
        let month = splits[1];
        let day = splits[2];
        let time = splits[4];
        return [weekDay, month, day, time];
    }


    return (
    <div class = "cardbody">
        <div class="container">
            <div class="images">
                <MapContainer lat = {lat} lng = {lng} width = "50%"/>
            </div>
        <div class="slideshow-buttons">
            <div class="one"></div>
            <div class="two"></div>
            <div class="three"></div>
            <div class="four"></div>
        </div>
        <p class="pick">Availability</p>
        
        <div class="product">
        <p>{owned_by}</p>
        <h1>{address}</h1>
        <h2>{price}/hour</h2>
        {distance_from_user && <h4>Distance: {distance_from_user}</h4>}
        {type && <p style = {{fontSize: '80%'}}>Type: {type}</p>}

        <p class="desc">{description}</p>
        {ownSpot && <p style = {{fontSize: '100%', fontWeight: '400'}}>Your Spot</p>}
        {vehicle_type && <h3 class = "desc">{vehicle_type}</h3>}
        {vehicle_num && <h3 class = "desc">{vehicle_num}</h3>}
        <p class = "desc"></p>
        <div class="sizes">
            
            <div class="size">
            <p>Start</p>
                <p class = "start_date">{availability_start.split('T')[0]}</p> 
                <p class = "start_time">{availability_start.split('T')[1]}</p>
            </div>
            <div class = "size">
            <p>End</p>

                <p class = "start_date">{availability_end.split('T')[0]}</p> 
                <p class = "start_time">{availability_end.split('T')[1]}</p>            
            </div>
        </div>
        {!props.reserve &&  <div class="buttons">
            <Link to = {spaceLink}>
                <button>Reserve</button>
            </Link>
        </div>}
       
        </div>
    </div>
  </div>
  )
}

export default NewCard; 