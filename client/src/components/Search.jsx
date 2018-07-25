import React, { Component } from 'react';
import { Table, Input, Button } from 'reactstrap';
import axios from 'axios';

class Search extends Component {

    state = {
        title: '',
        value: '',
        restaurants: []
    };

    getRandomRestaurants = () => {
        axios.get('/restaurants/random')
        .then(res => {
            const restaurants = res.data;
            this.setState({ restaurants });
            this.setState({ title : "This is a Randomly Generated List of NYC restaurants"})
        });
    } 

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
            axios.get('/restaurants/', {
                params: {
                    zip: this.state.value,
                }
            }).then(res => {
                const restaurants = res.data;
                const title = 'Based on your Search Zip ' + this.state.value;
                this.setState({ restaurants, title });
            });
    }


    render() {
        return (
            <div>
                <h3>{this.state.title}</h3>

                <Input type="number" value={this.state.value} placeholder="Enter Zip" onChange={this.handleChange.bind(this)}></Input>
                <Button color='success' onClick={this.getRandomRestaurants}>Generate Random</Button>
                <Button onClick={this.handleSubmit}>Search By Zip</Button>

                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Cuisine</th>
                            <th>Address</th>
                            <th>Zipcode</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.restaurants.map((restaurant, i) =>
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{restaurant.name}</td>
                                <td>{restaurant.cuisine}</td>
                                <td>{restaurant.address.street}</td>
                                <td>{restaurant.address.zipcode}</td>
                            </tr>)
                        }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Search;