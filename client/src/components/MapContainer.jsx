import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
 
export class MapContainer extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            lat : this.props.lat,
            lng : this.props.lng
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
            this.setState(nextProps)
        }
    }

    render(){
        return (
            <Map google={this.props.google}
                style={{ width: '30%', height: '40%', position: 'relative', marginLeft: '100px' }}
                initialCenter={{
                    lat: this.state.lat,
                    lng: this.state.lng
                  }}
                className={'map'}
                zoom={15}>
                <Marker
                    title={'The marker`s title will appear as a tooltip.'}
                    name={'SOMA'}
                    position={{ lat: this.state.lat , lng: this.state.lng }} />
            </Map>
        );
    }

}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyD7fWSBwp4mIiUC_02IQqC95KRwkoolRac")
})(MapContainer)