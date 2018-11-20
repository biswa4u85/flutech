import React, { Component } from 'react';
import '../styles/style.css';
import logoImg from '../images/flutech.png';
import {getCookie} from '../utils';

class Header extends Component {

    constructor(){
        super();
        this.state = {
            userName : ''
        }

    }

    componentDidMount() {
        var name = getCookie('userName')
        if(name === '' || name === undefined){
            window.location.href = '/';
        } else {
            this.setState({userName : name});
        }
    }

    render() {
      return (
        <div className="header">
            <div className="img-container">
                <img src={logoImg} />
            </div>
            <div className="user-details">
                <span>Welcome, {this.state.userName} </span>
            </div>
        </div>
      );
    }
  }
  
  export default Header;