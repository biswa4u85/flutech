import React, { Component } from 'react';
import '../styles/style.css';
import SideMenu from './sideMenu';
import Header from './header';
import {CustomInputText, CustomDropdown} from './inputComponents';
import {postService,getService} from '../services/base_service';
import {properties} from '../properties';
import $ from 'jquery';
import Alerts from './alerts';

class Remainder extends Component {
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
                        <h3 className="main-menu-name">Home / Mailer</h3>
                        <h2 className="welcome-text">Mailer</h2>
                        <hr />
                        <div className="mailer">
                            <CustomDropdown fieldName="Reason For Delay" id="selectMailer" optName="Select Delay" />
                            <textarea></textarea>
                            <input type="button" value="Send" id="btnSend" onClick={this.sendMail}></input>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Remainder;