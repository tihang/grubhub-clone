import React from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
 
export class MapContainer extends React.Component {
  render() {
    return (
        <Map google={this.props.google}
            style={{ width: '100%', height: '100%', position: 'relative' }}
            className={'map'}
            zoom={15}>
            <Marker
                title={'The marker`s title will appear as a tooltip.'}
                name={'SOMA'}
                position={{ lat: this.props.lat , lng: this.props.lng }} />
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyD7fWSBwp4mIiUC_02IQqC95KRwkoolRac")
})(MapContainer)