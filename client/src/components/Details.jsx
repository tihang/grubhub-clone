import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Badge } from 'reactstrap';
import MapContainer from './MapContainer';
import { Table } from 'reactstrap';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            name : '',
            lat: '',
            lng: '',
            grades : []
        }
    }

    componentWillMount(){
        axios.get('/api/restaurants/findById/', {
            params: { id: this.state.id }
        }).then(res => {
            const name = res.data.name;
            const lat = res.data.y;
            const lng = res.data.x; 
            const grades = res.data.grades;
            this.setState({ name, lat, lng, grades});
        })
    }



  render() {
    return (
        <div>
            <br/><br/>
            <h1><Badge color="secondary">{this.state.name}</Badge></h1> 

            <Table>
                <thead>
                    <tr>
                        <th>Grade</th>
                        <th>Score</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.grades.map((grade, i) => (
                        <GradesList key={i} index={i} grade={grade}/>
                    ))}
                </tbody>
            </Table>
            <MapContainer lat={this.state.lat} lng={this.state.lng} />
        </div>
    );
  }

}

export default Details;

const GradesList = (props) =>{
    return(
        <Fragment>
            <tr key = {props.index}>
                <td>{props.grade.grade}</td>
                <td>{props.grade.score}</td>
                <td>{props.grade.date}</td>
            </tr>
        </Fragment>
    );
}