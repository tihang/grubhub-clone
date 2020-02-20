import React, { Component } from 'react';
import './App.css';
import MyNavbar from './components/MyNavbar';
import Search from './components/Search';
import Details from './components/Details';
import Home from './components/Home';
import { BrowserRouter as Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';


class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
            <Route component={MyNavbar} />
            <Route path = "/" exact component={Search} />
            <Route path= "/search" exact component={Search} />
            <Route path="/details/:id" exact strict component={Details} />
        </div>
      </Router>
    );
  }
}
export default App;
