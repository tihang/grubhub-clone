import React, { PureComponent } from 'react';
import axios from 'axios';
import { Badge } from 'reactstrap';


class Details extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            name : '',
            x : '',
            y : ''
        }
    }

    componentDidMount(){
        this.delayedShowMarker()
        return (
            axios.get('/api/restaurants/findById/', {
                params: { id: this.state.id }
            }).then(res => {
                const name = res.data.name;
                const x = res.data.x;
                const y = res.data.y;
                this.setState({ name, x, y });
            })
        );
    }
    
      delayedShowMarker = () => {
        setTimeout(() => {
          this.setState({ isMarkerShown: true })
        }, 3000)
      }
    
      handleMarkerClick = () => {
        this.setState({ isMarkerShown: false })
        this.delayedShowMarker()
      }

  render() {
    return (
        <div>
            <br/><br/>
            <h1><Badge color="secondary">{this.state.name}</Badge></h1>
            <h4><Badge color="secondary">{this.state.x}</Badge></h4>
            <h4><Badge color="secondary">{this.state.y}</Badge></h4>
        </div>
    );
  }

}

export default Details;

