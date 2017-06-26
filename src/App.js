import React, { Component } from 'react';
import './App.css';
import Logo from './components/Logo/Logo.js';
import SearchBar from './components/SearchBar/SearchBar.js';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Logo />
          <h2>Welcome to Shpock</h2>
        </div>
        <div className="App-searchbar">
          <SearchBar />
        </div>
      </div>
    );
  }
}

export default App;
