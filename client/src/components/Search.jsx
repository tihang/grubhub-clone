import React, { Component, Fragment } from 'react';
import { Table, Input, Button, InputGroup, InputGroupAddon, Container, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';


class Search extends Component {

    state = {
        title: '',
        zipValue: '',
        nameValue: '',
        restaurants: [],
        modal: false
    };
//Restaurant Modal toggle
    toggle = () =>{
        this.setState({
          modal: !this.state.modal
        });
      }

    getRandomRestaurants = () => {
        axios.get('/api/restaurants/random')
        .then(res => {
            const restaurants = res.data;
            this.setState({ restaurants });
            this.setState({ title : "This is a Randomly Generated List of NYC restaurants"})
        });
    } 

    handleZipChange = (event) => {
        const query = event.target.value;
        if(query.length >= 2){
            axios.get('/api/restaurants/', {
                params: {
                    zip: query,
                }
            }).then(res => {
                const restaurants = res.data;
                const title = 'Based on your Search Zip ' + this.state.zipValue;
                this.setState({ restaurants, title });
            });
        }

    }

    handleSearchByName = (event) =>{
        const query = event.target.value;
        if(query.length > 1){
            axios.get('/api/restaurants/findByName/', {
                params : {
                    name : query
                }
            }).then(res => {
                const restaurants = res.data;
                const title = 'Based on your Search Name ' + this.state.nameValue;
                this.setState({ restaurants, title });
            });
        }
    }

    render() {
        return <div>
            <h2>Search among 25,359 restaurants in NYC</h2>
            <br />
            <Button color="info" onClick={this.getRandomRestaurants}>
              Get Random from Database
            </Button>
            <br />
            <br />
            <Container>
              <InputGroup size="lg">
                <InputGroupAddon addonType="prepend">
                  ZipCode
                </InputGroupAddon>
                <Input onKeyUp={this.handleZipChange.bind(this)} />
              </InputGroup>
              <br />
              <InputGroup size="lg">
                <InputGroupAddon addonType="prepend">
                  Name
                </InputGroupAddon>
                <Input onKeyUp={this.handleSearchByName.bind(this)} />
              </InputGroup>
            </Container>

            <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
              <ModalHeader toggle={this.toggle}>
                Modal title
              </ModalHeader>
              <ModalBody></ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.toggle}>
                  Do Something
                </Button> <Button color="secondary" onClick={this.toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
            <br />
            {/* <Button onClick={this.handleSubmit}>Search By Zip</Button> */}
            <h3>{this.state.title}</h3>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Cuisine</th>
                  <th>Address</th>
                  <th>Zipcode</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {this.state.restaurants.map((restaurant, i) => (
                  <RestaurantList key={i} index={i} restaurant={restaurant} />
                ))}
              </tbody>
            </Table>
          </div>;
    }
}
export default Search;


const RestaurantList = (props) => {
    return (
        <Fragment>
            <tr key={props.index}>
                <td>{props.index + 1}</td>
                <td>{props.restaurant.name}</td>
                <td>{props.restaurant.cuisine}</td>
                <td>{props.restaurant.address.street}</td>
                <td>{props.restaurant.address.zipcode}</td>
                <td><Link to={`/details/${props.restaurant._id}`}>Details</Link></td>
            </tr>
        </Fragment>
    );
}