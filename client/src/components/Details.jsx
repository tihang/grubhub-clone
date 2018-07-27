import React, { PureComponent } from 'react';
import axios from 'axios';
import { Badge } from 'reactstrap';
import MapContainer from './MapContainer';

class Details extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            name : '',
            lat: '',
            lng: ''   
        }
    }

    componentWillMount(){
        axios.get('/api/restaurants/findById/', {
            params: { id: this.state.id }
        }).then(res => {
            const name = res.data.name;
            const lat = res.data.y;
            const lng = res.data.x; 
            this.setState({ name, lat, lng});
        })
        
    }

  render() {
    return (
        <div>
            <br/><br/>
            <h1><Badge color="secondary">{this.state.name}</Badge></h1> 
            <h4><Badge color="secondary">{this.state.lat}</Badge></h4>
            <h4><Badge color="secondary">{this.state.lng}</Badge></h4>

            <MapContainer lat={this.state.lat} lng={this.state.lng}/>
        </div>
    );
  }

}

export default Details;

// export default GoogleApiWrapper({
//     apiKey: ("AIzaSyD7fWSBwp4mIiUC_02IQqC95KRwkoolRac")
//   })(MapContainer)
