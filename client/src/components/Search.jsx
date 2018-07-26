import React, { Component } from 'react';
import { Table, Input, Button, InputGroup, InputGroupAddon, Container } from 'reactstrap';
import axios from 'axios';

class Search extends Component {

    state = {
        title: '',
        zipValue: '',
        nameValue: '',
        restaurants: []
    };

    getRandomRestaurants = () => {
        axios.get('/api/restaurants/random')
        .then(res => {
            const restaurants = res.data;
            this.setState({ restaurants });
            this.setState({ title : "This is a Randomly Generated List of NYC restaurants"})
        });
    } 

    handleZipChange = (event) => {
        this.setState({ zipValue: event.target.value });
    }

    handleSearchByName = (event) =>{
        const query = event.target.value;
        if(query.length > 1){
            axios.get('/api/restaurants/byName/', {
                params : {
                    name : query
                }
            }).then(res => {
                const restaurants = res.data;
                const title = 'Based on your Search Name ' + this.state.value;
                this.setState({ restaurants, title });
            });
        }


    }

    handleSubmit = (event) => {
        event.preventDefault();
            axios.get('/api/restaurants/', {
                params: {
                    zip: this.state.zipValue,
                }
            }).then(res => {
                const restaurants = res.data;
                const title = 'Based on your Search Zip ' + this.state.zipValue;
                this.setState({ restaurants, title });
            });
    }


    render() {
        return (
            <div>
                <h2>Search among 25,359 restaurants in NYC</h2>
                <br/>
                <Button color='info' onClick={this.getRandomRestaurants}>Get Random from Database</Button><br/><br/>
                <Container>
                <InputGroup size="lg">
                    <InputGroupAddon addonType="prepend">ZipCode:</InputGroupAddon>
                    <Input value={this.state.value} onChange={this.handleZipChange.bind(this)} />
                </InputGroup>
                <br/>
                <InputGroup size="lg">
                    <InputGroupAddon addonType="prepend">Type name to search by name</InputGroupAddon>
                    <Input value={this.state.value} onKeyUp={this.handleSearchByName.bind(this)} />
                </InputGroup>
                </Container>

                
                <br />
                <Button onClick={this.handleSubmit}>Search By Zip</Button>
                <h3>{this.state.title}</h3>
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