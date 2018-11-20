import React, { Component } from 'react';
import '../styles/style.css';
import SideMenu from './sideMenu';
import Header from './header';
import {postService,getService} from '../services/base_service';
import {properties} from '../properties';
import $ from 'jquery';
import Alerts from './alerts';
import Loader from './loader';
import {getCookie} from '../utils';

class ViewIntent extends Component {
    constructor(props, context){
        super(props, context)
        this.state = {
            alertActivity : '',
            isLoad: true,
            MaterialJson: {}
        }
        this.formatTime = this.formatTime.bind(this);
    }

    componentDidMount(){
        var props = this.props;
        var intentId = props.match.params.id;
        var intentIdUrl = properties.getIntentById;
        var dataObj = {intentId:intentId};
        var _that = this;
        getService(intentIdUrl, dataObj).done(function(res){
            var data = res.data[0];
            var raisedDate = _that.formatTime(data.CreatedDate);
            var apprvDate = _that.formatTime(data.ApprovedDate);
            _that.setState({
                intentId: data.IntentId,
                intentStatus: data.StatusName,
                siteName: data.SiteName,
                raisedBy: data.ContractorName,
                raisedDate: raisedDate,
                approvedBy: data.ApprovedBy,
                approvedDate: apprvDate,
                remarks: data.Remarks,
                MaterialJson: JSON.parse(data.MaterialJson),
                isLoad:false
            })
        });
    }

    formatTime(date) {
        var fullDay = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var dt = new Date(date);
        var retDt = fullDay[dt.getDay()]+', '+dt.getDate()+' '+dt.getFullYear()+'. '+dt.getHours()+':'+dt.getMinutes();
        return retDt;
    }

    intentStatus(e, statusId) {
        var intentStatusUrl = properties.intentStatus;
        var userId = getCookie('userId');
        var dataObj = {
            IntentId: this.state.intentId,
            StatusId: statusId,
            ChangedBy: userId
        }
        this.setState({isLoad:true});
        var _that = this;
        postService(intentStatusUrl, dataObj).done(function(res){
            console.log(res.data);
            _that.setState({
                isLoad: false,
                alertActivity: statusId === 2 ? 'Approved Intent' : 'Rejected Intent'
            })
        });
    }

    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <SideMenu />
                    <div className="data-container">
                        <Alerts activity={this.state.alertActivity}/>
                        <h3 className="main-menu-name">Home / View Intent</h3>
                        <h2 className="welcome-text">View Intent</h2>
                        <hr />
                        <div className="view-intent">
                            <div className="field-container">
                                <p>
                                    <span>Intent No: {this.state.intentId}</span>
                                </p>
                                <p>
                                    <span>Site Name : {this.state.siteName}</span>
                                </p>
                                <p>
                                    <span>Raised By : {this.state.raisedBy}</span>
                                </p>
                                <p>
                                    <span>Raised Date & Time : {this.state.raisedDate}</span>
                                </p>
                            </div>
                            <div className="field-container">
                                <p>
                                    <span>Intent Status : {this.state.intentStatus}</span>
                                </p>
                                <p>
                                    <span>Approved By : {this.state.approvedBy}</span>
                                </p>
                                <p>
                                    <span>Approved Date & Time : {this.state.approvedDate}</span>
                                </p>
                            </div>
                            <br />
                            <br />
                            <table className="data-table">
                                <tbody>
                                    <tr>
                                        <th>Contractor Name</th>
                                        <th>Material Type</th>
                                        <th>Material Name</th>
                                        <th>Variant</th>
                                        <th>Thickness</th>
                                        <th>Size</th>
                                        <th>Colour</th>
                                        <th>Remarks</th>
                                    </tr>
                                    <tr>
                                        <td>{this.state.raisedBy}</td>
                                        <td>{this.state.MaterialJson.MaterialType}</td>
                                        <td>{this.state.MaterialJson.MaterialName}</td>
                                        <td>{this.state.MaterialJson.Variant}</td>
                                        <td>{this.state.MaterialJson.Thick}</td>
                                        <td>{this.state.MaterialJson.MaterialSize}</td>
                                        <td>{this.state.MaterialJson.Colour}</td>
                                        <td>{this.state.remarks}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="view-intent-buttons">
                                <input type="button" value="Reject" className="button-light" onClick={() => {this.intentStatus('',5)}}></input>
                                <input type="button" value="Approve" onClick={() => {this.intentStatus('',2)}}></input>
                            </div>
                            <Loader isLoad={this.state.isLoad} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewIntent;