import React, { Component } from 'react';
import '../styles/style.css';
import {CustomInputText} from './inputComponents';
import mainImg from '../images/image.png';
import logoImg from '../images/flutech.png';
import { Link } from 'react-router-dom';
import {postService} from '../services/base_service';
import {properties} from '../properties';
import $ from 'jquery';
import Loader from './loader';
import {setCookie, getLocation} from '../utils';

class DashboardHome extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoad : false
        }

        this.loginUser = this.loginUser.bind(this);
        this.forgotPwd = this.forgotPwd.bind(this);
        this.sendMail = this.sendMail.bind(this);
        this.closeForgotContainer = this.closeForgotContainer.bind(this);
    }
    
    componentDidMount(){
        getLocation();
    }

    loginUser() {
        var _that = this;
        var url = properties.loginUser;

        var empId = $('#empId').val();
        var empPwd = $('#empPwd').val();
        if(empId && empPwd){
            var dataObj = {LoginId:empId,Password:empPwd};
            this.setState({
                isLoad : true
            })
            postService(url,dataObj).done(function(res){
                _that.setState({
                    isLoad : false
                })
                var empData = res.data;
                setCookie('userName',empData.EmployeeName);
                setCookie('userId',empData.EmployeeId);
                window.location.href = '/dashboard';
            });
        }
    }

    forgotPwd() {
        $("#login-fields").addClass('display-none');
        $("#forgot-fields").removeClass('display-none');
    }

    sendMail() {
        var forgotUrl = properties.forgotPassword;
        var empId = $("#forgotEmpId").val();
        var _that = this;
        var dataObj = {
            LoginId: empId
        }
        this.setState({isLoad: true});
        if(empId){
            postService(forgotUrl,dataObj).done(function(res){
                _that.setState({
                    isLoad : false
                })
                $("#alertBox").removeClass('display-none');
                $("#forgotEmpId").val('');
            });
        }
    }

    closeForgotContainer() {
        $("#login-fields").removeClass('display-none');
        $("#forgot-fields").addClass('display-none');
    }

    render() {
        return (
            <div className="login-container">
                <div className="login-img-container">
                    <img src={mainImg} width="85.7%"/>
                </div>
                <div className="login-field-container">
                    <div id="alertBox" className="success-box display-none">
                        Email sent successfully
                    </div>
                    <div id="login-fields">
                        <img src={logoImg} width="50%"/>
                        <CustomInputText fieldName="Employee Id" id="empId"/>
                        <div className="input-text">
                            <span>Password</span><br/>
                            <input type="password" placeholder="Password" id="empPwd"></input>
                        </div>
                        
                        <div>
                            <input type="checkbox" className="remember-check"></input><span className="remember-text">Remember Password</span>
                            <span className="forgot-pwd" onClick={this.forgotPwd}>Forgot Password?</span>
                        </div>
                        <input type="button" className="btn-signin" value="Sign In" id="btnSubmit" onClick={this.loginUser}></input> 
                        <div className="login-loader">
                            <Loader isLoad={this.state.isLoad}/>
                        </div>
                    </div>
                    <div id="forgot-fields" className="display-none">
                        <div className="forgot-container">
                            <i class="close fas fa-times" onClick={this.closeForgotContainer}></i>
                            <CustomInputText fieldName="Employee Id" id="forgotEmpId"/>
                            <input type="button" className="btn-signin" value="Send Email" onClick={this.sendMail}></input> 
                            <div className="forgot-loader">
                                <Loader isLoad={this.state.isLoad}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DashboardHome;