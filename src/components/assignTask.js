import React, { Component } from 'react';
import '../styles/style.css';
import SideMenu from './sideMenu';
import Header from './header';
import {postService,getService} from '../services/base_service';
import {properties} from '../properties';
import $ from 'jquery';
import Alerts from './alerts';
import Overlays from './overlays';
import Loader from './loader';
import {getCookie, dateFormat} from '../utils';

class AssignTask extends Component {
    constructor(props, context){
        super(props, context)
        this.state = {
            alertActivity : '',
            tasks: [],
            overlayData: '',
            taskData: {},
            isLoad: true
        }

        this.taskReminder = this.taskReminder.bind(this);
    }

    componentDidMount(){
        var property_data = properties;
        var url = property_data.getCreatedTasksById;
        var dataObj = {};
        var assignId = getCookie('userId');
        var _that = this;

        var dataObj = {
            EmployeeId: assignId,
        };

        postService(url,dataObj).done(function(res){
            var data = res.data;
            _that.setState({
                tasks: data,
                isLoad: false
            });
        });
    }

    taskReminder(e, data) {
        var assignId = data.AssignID;
        var description = data.Description;
        var cretedDate = data.CreatedDate;
        var viewedData = new Date().toISOString();

        var url = properties.taskReminder;
        var _that = this;

        var dataObj = {
            "AssignID": assignId,
            "Description": description,
            "CreatedDate": cretedDate,
            "ViewedData": viewedData
        }

        postService(url,dataObj).done(function(res){
            var data = res.data;
            console.log('res', res);
            _that.setState({alertActivity:'success'});
        });
    }

    cloneTaks(e, data){
        console.log(data);
        this.setState({
            overlayData: 'cloneTask',
            taskData: data
        })
    }

    editTaks(e, data){
        console.log(data);
        this.setState({
            overlayData: 'editTask',
            taskData: data
        })
    }

    render() {

        var tblData = this.state.tasks.map((data,index) => (
            <tr key={index}>
                <td>{index+1}</td>
                <td>{dateFormat(data.CreatedDate)}</td>
                <td>{dateFormat(data.StartDate)}</td>
                <td>{dateFormat(data.EndDate)}</td>
                <td>{data.Description}</td>
                <td>{data.VersionID}</td>
                <td>{data.Assigner}</td>
                <td>{data.StatusName}</td>
                <td>{data.BalancedDays}</td>
                <td>{data.OverDueDays}</td>
                <td>
                    <span className="far fa-bell" onClick={this.taskReminder.bind(this,'',data)}></span>
                    <span className="far fa-clone" onClick={() => {this.cloneTaks('',data)}}></span>
                    <span className="fas fa-edit" onClick={() => {this.editTaks('',data)}}></span>
                </td>
            </tr>
        ))
        
        return (
            <div>
                <Overlays overlayData={this.state.overlayData} taskData={this.state.taskData}/>
                <Header />
                <div className="container">
                    <SideMenu />
                    <div className="data-container">
                        <Alerts activity={this.state.alertActivity}/>
                        <h3 className="main-menu-name">Home / Assign Task</h3>
                        <h2 className="welcome-text">Assign Task</h2>
                        <hr />
                        <br />
                        <table className="data-table">
                            <tbody>
                                <tr>
                                    <th>SI#</th>
                                    <th>Created Date</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Task Description</th>
                                    <th>Version</th>
                                    <th>Assign To</th>
                                    <th>Status</th>
                                    <th>Balance Days</th>
                                    <th>Overdue Days</th>
                                    <th>
                                        <span className="fas fa-plus"></span>
                                    </th>
                                </tr>
                                {
                                    tblData
                                }
                            </tbody>
                        </table>
                        <br />
                        <Loader isLoad={this.state.isLoad}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default AssignTask;
