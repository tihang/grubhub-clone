import React, { Component } from 'react';
import './App.css';
import NavbarComponent from './components/NavbarComponent';
import SearchComponent from './components/SearchComponent';
import icon from '../src/logo.png'

class App extends Component {

  render(){
    return(
      <div className="App">
      <link rel="icon" href={icon} />
      <NavbarComponent />
      <SearchComponent />
      </div>
    );
  }

}
export default App;
