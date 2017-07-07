import React, { Component } from 'react';
import styles from './Logo.css';
import logo from './shpock_logo.png';

class Logo extends Component {
  render() {
    return (
      <div className="Logo">
        <img src={logo} className="shpock-logo" alt="logo" />
      </div>
    );
  }
}

export default Logo;
