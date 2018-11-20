import React, { Component } from 'react';
import '../styles/style.css';
import SideMenu from './sideMenu';
import Header from './header';
import {CustomInputText, CustomMultiSelection} from './inputComponents';
import {postService,getService} from '../services/base_service';
import {properties} from '../properties';
import $ from 'jquery';
import Alerts from './alerts';
import Loader from './loader';

class Mailer extends Component {
    constructor(props, context){
        super(props, context)
        this.state = {
            isLoad: true,
            alertActivity : '',
            mailList: [],
            selectedMailIds: []
        }

    }

    componentDidMount(){
        var mailProperty = properties.getEmailList;
        var dataObj = {};
        var _that = this;
        getService(mailProperty,dataObj).done(function(res){
            var data = res.data;
            _that.setState({
                mailList:data,
                isLoad: false
            });
        })
    }

    selectEmployees = (e, idx, emailId) => {
        $('#mail'+idx).toggleClass('active');
        
        var indx = this.state.selectedMailIds.indexOf(emailId);
        if(indx == -1){
            this.state.selectedMailIds.push(emailId);
        } else {
            this.state.selectedMailIds.splice(indx,1)
        }
        
        this.setState({
            selectedMailIds: this.state.selectedMailIds
        },() => {
            $("#selectMailer").val(this.state.selectedMailIds);
        });
    }

    sendMail = () => {
        this.setState({
            isLoad: true
        })
        var mailTxt = $("#txtMail").val();
        var mailList = [];
        var list = this.state.selectedMailIds;
        for(var i=0; i<list.length; i++){
            mailList.push({'EmailId':list[i]})
        }
        var dataObj = {
            'MailBody': mailTxt,
            'MailList': mailList
        }
        var sendMailProp = properties.sendMail;
        var _that = this;
        getService(sendMailProp,dataObj).done(function(res){
            $("#txtMail").val('');
            $("#selectMailer").val('');
            _that.setState({
                isLoad: false,
                alertActivity : 'email-success'
            })
        })
    }

    render() {
        var empOptions = this.state.mailList.map((data,index) =>(
            data.EmailId && data.EmailId != 'null' ? 
            <li key={index} id={'mail'+index} onClick={(e) => this.selectEmployees(e, index, data.EmailId)}>
                {data.EmailId}
            </li>
            : ''
        ));

        return (
            <div>
                <Header />
                <div className="container">
                    <SideMenu />
                    <div className="data-container">
                        <Alerts activity={this.state.alertActivity}/>
                        <div className="mail-loader">
                            <Loader isLoad={this.state.isLoad} />
                        </div>
                        <h3 className="main-menu-name">Home / Mailer</h3>
                        <h2 className="welcome-text">Mailer</h2>
                        <hr />
                        <div className="mailer">
                            <CustomMultiSelection fieldName="Select" id="selectMailer" optName="Select Mailer" data={empOptions}/>
                            <textarea id="txtMail"></textarea>
                            <input type="button" value="Send" id="btnSend" onClick={() => this.sendMail()}></input>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Mailer;