import React, { Component } from 'react';
import '../styles/style.css';
import SideMenu from './sideMenu';
import Header from './header';
import {CustomDate, CustomDropdown} from './inputComponents';
import {postService,getService} from '../services/base_service';
import {properties} from '../properties';
import $ from 'jquery';
import Alerts from './alerts';
import Loader from './loader';
import { Link } from 'react-router-dom';
import {dateFormat} from '../utils';

class ListIntent extends Component {
    constructor(props, context){
        super(props, context)
        this.state = {
            alertActivity : '',
            sitesList: [],
            intentsList: [],
            isLoad: false
        }
        this.getIntents = this.getIntents.bind(this);
    }

    componentDidMount(){
        var siteProperty = properties.getSiteList;
        var dataObj = {};
        var _that = this;
        getService(siteProperty,dataObj).done(function(res){
            var data = res.data;
            _that.setState({sitesList:data});
        });
    }

    getIntents() {
        var siteName = $("#selectSite option:selected");
        var stDate = new Date($("#addStartDt").val()).toISOString();
        var edDate = new Date($("#addEndDt").val()).toISOString();
        var intentProp = properties.getIntentBySiteId;
        var _that = this;
        this.setState({isLoad: true})
        var dataObj = {
            siteId: siteName.attr('id'),
            StartDate: stDate,
            EndDate: edDate
        }
        getService(intentProp,dataObj).done(function(res){
            console.log(res);
            var data = res.data;
            _that.setState({
                intentsList: data,
                isLoad: false
            });
        })
    }

    render() {

        var siteOptions = this.state.sitesList.map((data, index) => (
            <option key={index} id={data.SiteId}>
                {data.SiteName}
            </option>
        ));

        var intentRows = this.state.intentsList.map((data, index) => (
            <tr key={index}>
                <td>{index+1}</td>
                <td><Link to={'/viewIntent/'+data.IntentId}>{data.IntentId}</Link></td>
                <td>{data.SiteName}</td>
                <td>{data.ContractorName}</td>
                <td>{dateFormat(data.CreatedDate)}</td>
                <td>{data.ApprovedBy}</td>
                <td>{data.StatusName}</td>
                <td><input type="button" value="Convert To Procurement" className="button-light"></input></td>
            </tr>
        ));
        
        return (
            <div>
                <Header />
                <div className="container">
                    <SideMenu />
                    <div className="data-container">
                        <Alerts activity={this.state.alertActivity}/>
                        <h3 className="main-menu-name">Home / Intent List</h3>
                        <h2 className="welcome-text">Intent List</h2>
                        <hr />
                        <div className="intent-list">
                            <div className="intent-list-fields">
                                <CustomDate fieldName="Start Date" id="addStartDt"/>
                                <CustomDate fieldName="End Date" id="addEndDt"/>
                                <CustomDropdown fieldName="Site Name" id="selectSite" optName="Select Site" data={siteOptions}/>
                                <input type="button" value="Submit" onClick={this.getIntents}></input>
                            </div>
                            <br />
                            <Loader isLoad={this.state.isLoad} />
                            {
                                this.state.intentsList && this.state.intentsList.length > 0 ? 
                                    <table className="data-table">
                                        <tbody>
                                            <tr>
                                                <th>SI#</th>
                                                <th>Intent No</th>
                                                <th>Site Name</th>
                                                <th>Raised By</th>
                                                <th>Raised Time</th>
                                                <th>Approved By</th>
                                                <th>Status</th>
                                                <th></th>
                                            </tr>
                                            {
                                                intentRows
                                            }
                                        </tbody>
                                    </table>
                                : ''
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListIntent;