import React, { Component } from 'react';
import '../styles/style.css';
import SideMenu from './sideMenu';
import Header from './header';
import {CustomInputText, CustomDropdown} from './inputComponents';
import {postService,getService} from '../services/base_service';
import {properties} from '../properties';
import $ from 'jquery';

class ReportsAlerts extends Component {
    constructor(props, context){
        super(props, context)
        
    }

    componentDidMount(){
        
    }

    render() {
        
        return (
            <div>
                <Header />
                <div className="container">
                    <SideMenu />
                    <div className="data-container">
                        <h3 className="main-menu-name">Home / Add Department</h3>
                        <h2 className="welcome-text">Add Department</h2>
                        <hr />
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default ReportsAlerts;