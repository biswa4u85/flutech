import React, { Component } from 'react';
import '../styles/style.css';
import SideMenu from './sideMenu';
import Header from './header';
import {CustomInputText, CustomDropdown} from './inputComponents';
import {postService,getService} from '../services/base_service';
import {properties} from '../properties';
import $ from 'jquery';
import Alerts from './alerts';

class Reviews extends Component {
    constructor(props, context){
        super(props, context)
        this.state = {
            alertActivity : ''
        }

        this.sendMail = this.sendMail.bind(this);
    }

    componentDidMount(){
        var hodProperty = properties.getHodEmployees;
        var dataObj = {};
        var _that = this;
        // getService(hodProperty,dataObj).done(function(res){
        //     console.log(res.data[0]);
        //     var data = res.data;
        //     _that.setState({hodEmps:data});
        // })
    }

    sendMail() {

    }

    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <SideMenu />
                    <div className="data-container">
                        <Alerts activity={this.state.alertActivity}/>
                        <h3 className="main-menu-name">Home / Review</h3>
                        <h2 className="welcome-text">Daily Review</h2>
                        <hr />
                        <div className="review">
                            <div className="field-container">
                                <CustomDropdown fieldName="Select Site" id="selectSite" optName="Select Site" />
                            </div>
                            <div className="field-container">
                                <CustomDropdown fieldName="Select Location" id="selectLocation" optName="Select Location" />
                            </div>
                            <div className="field-container">
                                <div className="review-text">
                                    You are Solely Responsible for Day to Day Assigned work. Communicate All Activities Properly to Respective Departments and Submit the Documents at the given time.
                                </div>
                            </div>
                            <div className="input-text">
                                <span>Whole Team Ensured Cleanliness, Safety, Rest/Food Breaks, Health for this day</span><br/>
                                <textarea id="txtareaFood">
                                
                                </textarea>
                            </div>
                            <div className="input-text">
                                <span>Met Optimum utilisation of Material, Tools/Equipment’s and Manpower</span><br/>
                                <textarea id="txtareaMaterial">
                                
                                </textarea>
                            </div>
                            <div className="input-text">
                                <span>No Damage/Misplaced, Waste of Material and Labor was kept Ideal</span><br/>
                                <textarea id="txtareaNoDamage">
                                
                                </textarea>
                            </div>
                            <input type="button" value="Submit"></input>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Reviews;