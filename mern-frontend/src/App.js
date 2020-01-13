import React, {Component} from 'react';
import Navbar from './containers/Navbar';
import Main from './containers/Main';
import {BrowserRouter as Router} from 'react-router-dom';

export default class App extends Component{
  render(){
    return (
      <div>
        <Navbar/>
        <Main/>
      </div>    
    )
  }
}
