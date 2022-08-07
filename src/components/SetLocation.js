import React from "react";

import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

class MapContainer extends React.Component {
  handleOnClick(e) {
    this.setState({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    this.props.setLatLng({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  }

  state = {
    lat: this.props.lat ? this.props.lat : null,
    lng: this.props.lng ? this.props.lng : null,
    loading: true,
    isOpen1: false,
    isOpen2: false,
    selectedCenter: null,
  };

  mapStyles = {
    height: this.props.height ? this.props.height : "500px",
    width: this.props.width ? this.props.width : "100%",
  };

  defaultCenter = {
    lat: this.props.lat ? this.props.lat : 27.7172,
    lng: this.props.lng ? this.props.lng : 85.324,
  };

  render() {
    return (
      <LoadScript googleMapsApiKey="AIzaSyAQGsvrhfxDeNrqgubmm4G9xC1sBpS5xSg">
        <GoogleMap
          mapContainerStyle={this.mapStyles}
          zoom={this.props.address2 ? 10 : 13}
          center={{ lat: this.defaultCenter.lat, lng: this.defaultCenter.lng }}
          onClick={
            this.props.lat && this.props.lng
              ? null
              : (e) => this.handleOnClick(e)
          }
        >
          {this.state.lat && this.state.lng ? (
            <Marker
              position={{ lat: this.state.lat, lng: this.state.lng }}
              onClick={() => {
                this.setState({ isOpen1: !this.state.isOpen1 });
              }}
            >
              {this.state.isOpen1 ? (
                <InfoWindow
                  position={{ lat: this.props.lat2, lng: this.props.lng2 }}
                  onCloseClick={() => {
                    this.setState({ isOpen1: !this.state.isOpen1 });
                  }}
                >
                  <p>{this.props.storeName}</p>
                </InfoWindow>
              ) : null}
            </Marker>
          ) : null}
          {this.props.lat2 && this.props.lng2 ? (
            <Marker
              position={{ lat: this.props.lat2, lng: this.props.lng2 }}
              onClick={() => {
                this.setState({ isOpen2: !this.state.isOpen2 });
              }}
              onLoad={(marker) => {
                const customIcon = (opts) =>
                  Object.assign(
                    {
                      path: "M12.75 0l-2.25 2.25 2.25 2.25-5.25 6h-5.25l4.125 4.125-6.375 8.452v0.923h0.923l8.452-6.375 4.125 4.125v-5.25l6-5.25 2.25 2.25 2.25-2.25-11.25-11.25zM10.5 12.75l-1.5-1.5 5.25-5.25 1.5 1.5-5.25 5.25z",
                      fillColor: "#000000",
                      fillOpacity: 1,
                      strokeColor: "#000",
                      strokeWeight: 1,
                      scale: 1.3,
                    },
                    opts
                  );

                marker.setIcon(
                  customIcon({
                    fillColor: "green",
                    strokeColor: "white",
                  })
                );
              }}
            >
              {this.state.isOpen2 ? (
                <InfoWindow
                  position={{ lat: this.props.lat2, lng: this.props.lng2 }}
                  onCloseClick={() => {
                    this.setState({ isOpen2: !this.state.isOpen2 });
                  }}
                >
                  <p>You</p>
                </InfoWindow>
              ) : null}
            </Marker>
          ) : null}
          )
        </GoogleMap>
      </LoadScript>
    );
  }
}

export default MapContainer;
