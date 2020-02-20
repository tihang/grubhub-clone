import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: this.props.lat,
      lng: this.props.lng
    };
  }

  render() {
    return (
      <Map
        google={this.props.google}
        style={{
          width: "30%",
          height: "40%",
          position: "relative",
          marginLeft: "100px"
        }}
        initialCenter={{
          lat: this.state.lat,
          lng: this.state.lng
        }}
        className={"map"}
        zoom={15}
      >
        <Marker
          icon={
            "http://mt.google.com/vt/icon?psize=27&font=fonts/Roboto-Bold.ttf&color=ff135C13&name=icons/spotlight/spotlight-waypoint-a.png&ax=43&ay=50&text=•&scale=2"
          }
          title={"The marker`s title will appear as a tooltip."}
          name={"SOMA"}
          position={{ lat: this.state.lat, lng: this.state.lng }}
        />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.Google_API_key
})(MapContainer);
