import React, { Component } from 'react';
import '../styles/style.css';
import SideMenu from './sideMenu';
import Header from './header';
import {Table} from './inputComponents';
import {postService,getService} from '../services/base_service';
import {properties} from '../properties';
import $ from 'jquery';
import Alerts from './alerts';
import Loader from './loader';
import Overlays from './overlays';
import {getCookie, dateFormat} from '../utils';

class AddDept extends Component {
    constructor(props, context){
        super(props, context)
        this.state = {
            alertActivity : '',
            myTasks: [],
            overlayData : '',
            isLoad: true,
            taskId: ''
        }

    }

    componentDidMount(){
        var property_data = properties;
        var url = property_data.getMyTasksById;
        var dataObj = {};
        var assignId = getCookie('userId');
        var _that = this;

        var dataObj = {
            EmployeeId: assignId,
        };
        postService(url,dataObj).done(function(res){
            var data = res.data;
            _that.setState({
                myTasks: data,
                isLoad: false
            });
        });
    }

    changeStatus(e, assignId, statusId) {
        this.setState({
            overlayData:'',
            isLoad: true
        });
        var _that = this;
        var url = properties.statusHistory;
        var dataObj = {
            "TaskStatusId": 1,
            "AssignID": assignId,
            "StatusId": statusId,
            "CreatedDate": new Date().toISOString()
        }

        postService(url,dataObj).done(function(res){
            var data = res.data;
            console.log(data);
            _that.setState({
                alertActivity: 'updated',
                isLoad: false
            });
        });

    }

    frwrdTask(e, taskId) {
        this.setState({
            overlayData: 'forwordTask',
            taskId: taskId,
            alertActivity: 'success'
        })
    }

    commentTask(e, taskId) {
        this.setState({
            overlayData: 'commentTask',
            taskId: taskId,
            alertActivity: 'success'
        });
    }

    render() {
        
        var tblData = this.state.myTasks.map((data,index) => (
            <tr key={index}>
                <td>{index+1}</td>
                <td>{dateFormat(data.CreatedDate)}</td>
                <td>{dateFormat(data.StartDate)}</td>
                <td>{dateFormat(data.EndDate)}</td>
                <td>{data.Description}</td>
                <td>{data.VersionID}</td>
                <td>{data.Assigner}</td>
                <td>{data.StatusName}</td>
                <td>
                    <span className="fas fa-check" onClick={() => {this.changeStatus('', data.AssignID, 2)}}></span>
                    <span className="fas fa-reply" onClick={() => {this.frwrdTask('', data.AssignID)}}></span>
                    <span className="far fa-comment-alt" onClick={() => {this.commentTask('', data.AssignID)}}></span>
                    <span className="fas fa-thumbs-up" onClick={() => {this.changeStatus('', data.AssignID, 4)}}></span>
                </td>
            </tr>
        ))

        return (
            <div>
                <Overlays overlayData={this.state.overlayData} taskId={this.state.taskId}/>
                <Header />
                <div className="container">
                    <SideMenu />
                    <div className="data-container">
                        <Alerts activity={this.state.alertActivity}/>
                        <h3 className="main-menu-name">Home / My Task</h3>
                        <h2 className="welcome-text">My Task</h2>
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
                                    <th>Assigner</th>
                                    <th>Status</th>
                                    <th></th>
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

export default AddDept;
