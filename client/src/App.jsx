import React, { Component } from 'react';
import './App.css';
import MyNavbar from './components/MyNavbar';
import Search from './components/Search';
import icon from '../src/logo.png'
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Route from 'react-router-dom/Route';


class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
            <Link to="/" ></Link>

            <Route component={MyNavbar} />
            <Route path="/home" exact component={MyNavbar} />
            <Route path="/search" exact component={Search} />
        </div>
      </Router>
    );
  }

}
export default App;
