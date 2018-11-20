import React, { Component } from 'react';
import '../styles/style.css';
import {CustomDate, CustomDropdown, CustomTextArea} from './inputComponents';
import {getService, postService} from '../services/base_service';
import {properties} from '../properties';
import $ from 'jquery';
import {getCookie} from '../utils';

class Overlays extends Component {
    constructor(props, context){
        super(props, context)
        this.state = {
            overlayData : '',
            deptLst: [],
            emps: []
        }

        this.forwordingTask = this.forwordingTask.bind(this);
        this.commentingTask = this.commentingTask.bind(this);
        this.updatingTask = this.updatingTask.bind(this);
    }

    componentDidMount(){
        
    }

    componentWillReceiveProps(nextProps){
        this.setState({overlayData : nextProps.overlayData});
        var ovrData = nextProps.overlayData;
        var dataObj = {};
        var _that = this;
        console.log(nextProps);
        if(ovrData == 'forwordTask'){
            var empProperty = properties.getEmployeeList;
            
            getService(empProperty,dataObj).done(function(res){
                var data = res.data;
                _that.setState({emps:data});
            })
        }

        if(ovrData == 'cloneTask' || ovrData == 'editTask'){
            var deptProperty = properties.getDepartmentList;
            var empProperty = properties.getEmployeeList;
            var dataObj = {};
            var _that = this;
            getService(deptProperty,dataObj).done(function(res){
                var data = res.data;
                _that.setState({deptLst:data});
            })

            getService(empProperty,dataObj).done(function(res){
                var data = res.data;
                _that.setState({emps:data});
            })
        }
    }

    closeOverlay() {
        this.setState({overlayData : ''})
    }

    forwordingTask() {
        var forwordUrl = properties.forwordTask;
        var frwdId = $('#forwordTo option:selected');
        var dataObj = {
            "AssignID": this.props.taskId,
            "ForwordTo": frwdId.attr('id'),
            "ForwordDate": new Date().toISOString()
        }
        var _that = this;

        postService(forwordUrl,dataObj).done(function(res){
            console.log(res);
            _that.setState({overlayData : ''});
        });
    }

    commentingTask() {
        var commentUrl = properties.commentTask;
        var userId = getCookie('userId');
        var msg = $("#commentTaskDesc").val();
        var dataObj = {
            "AssignID": this.props.taskId,
            "EmployeeId": userId,
            "Message": msg
        }
        var _that = this;

        postService(commentUrl,dataObj).done(function(res){
            console.log(res);
            _that.setState({overlayData : ''});
        });
    }

    updatingTask() {
        var property_data = properties;
        var url = property_data.addTask;
        var strtDt = new Date($('#addStartDt').val()).toISOString();
        var endDt = new Date($('#addEndDt').val()).toISOString();
        var deptName = $("#deptName option:selected");
        var assignTo = $("#assignTo option:selected");
        var desc = $("#taskDesc").val();
        var assignerId = getCookie('userId');
        var _that = this;

        if(assignerId && strtDt && endDt && deptName.attr('id') && assignTo.attr('id') && desc){
            var dataObj = {
                AssignID: this.props.taskData.AssignID,
                AssignerId: assignerId,
                CreatedDate: new Date().toISOString(),
                StartDate: strtDt,
                EndDate: endDt,
                DepartmentId: deptName.attr('id'),
                AssignTo: assignTo.attr('id'),
                Description: desc,
                StatusId: 9,
                UpdateStatus: 0
            };
            console.log(dataObj);
            this.setState({isLoad: true})
            postService(url,dataObj).done(function(res){
                _that.setState({
                    alertActivity : 'success',
                    isLoad: false,
                    overlayData: ''
                });
            });
        } else {
            this.setState({
                alertActivity : 'error',
                overlayData: ''
            })
        }
    }

    render() {
        var forwordData = this.state.overlayData == 'forwordTask' && this.state.emps ? 
            this.state.emps.map((data,index) =>(
                <option key={index} id={data.EmployeeId}>
                    {data.EmployeeName}
            </option>)) : ''

        var empData = (this.state.overlayData == 'cloneTask' || this.state.overlayData == 'editTask') && this.state.emps ? 
            this.state.emps.map((data,index) =>(
                <option key={index} id={data.EmployeeId}>
                    {data.EmployeeName}
            </option>)) : ''

        var deptData = (this.state.overlayData == 'cloneTask' || this.state.overlayData == 'editTask') && this.state.deptLst ? 
            this.state.deptLst.map((data,index) =>(
                <option key={index} id={data.DeptId}>
                    {data.DepartmentName}
            </option>)) : ''

        return (
            <div>
            {
                this.state.overlayData ? 
                <div className="overlay">
                    <div className="overlay-container">
                        <i class="close fas fa-times" onClick={() => {this.closeOverlay()}}></i>
                    {
                        this.state.overlayData == 'forwordTask' && 
                        <div>
                            <h2>Forword Task</h2>
                            <div className="field-container">
                                <CustomDropdown fieldName="Forword To" id="forwordTo" optName="Forword To" data={forwordData}/>
                            </div>
                            <div className="field-container">
                                <input type="button" value="Forword" id="btnSubmit" onClick={this.forwordingTask}></input>
                            </div>
                        </div>
                    }

                    {
                        this.state.overlayData == 'commentTask' && 
                        <div>
                            <h2>Commnet Task</h2>
                            <div className="field-container">
                                <CustomTextArea fieldName="Task Description" id="commentTaskDesc"/>
                            </div>
                            <div className="field-container">
                                <input type="button" value="Comment" id="btnSubmit" onClick={this.commentingTask}></input>
                            </div>
                        </div>
                    }

                    {
                        this.state.overlayData == 'cloneTask' && 
                        <div>
                            <h2>Clone Task</h2>
                            <div className="field-container">
                                <CustomDate fieldName="Start Date" id="addStartDt" value={this.props.taskData.StartDate}/>
                                <CustomDate fieldName="End Date" id="addEndDt" value={this.props.taskData.EndDate}/>
                                <CustomDropdown fieldName="Department Name" id="deptName" optName="Select Department" data={deptData}/>
                            </div>
                            <div className="field-container">
                                <CustomDropdown fieldName="Assigned To" id="assignTo" optName="Assign" data={empData}/>
                                <CustomTextArea fieldName="Task Description" id="taskDesc" value={this.props.taskData.Description}/>
                            </div>
                            <div className="button-field-container">
                                <input type="button" value="Clone Task" id="btnCloneSubmit" onClick={this.updatingTask}></input>
                            </div>
                        </div>
                    }

                    {
                        this.state.overlayData == 'editTask' && 
                        <div>
                            <h2>Edit Task</h2>
                            <div className="field-container">
                                <CustomDate fieldName="Start Date" id="addStartDt" value={this.props.taskData.StartDate}/>
                                <CustomDate fieldName="End Date" id="addEndDt" value={this.props.taskData.EndDate}/>
                                <CustomDropdown fieldName="Department Name" id="deptName" optName="Select Department" data={deptData}/>
                            </div>
                            <div className="field-container">
                                <CustomDropdown fieldName="Assigned To" id="assignTo" optName="Assign" data={empData}/>
                                <CustomTextArea fieldName="Task Description" id="taskDesc" value={this.props.taskData.Description}/>
                            </div>
                            <div className="button-field-container">
                                <input type="button" value="Edit Task" id="btnEditSubmit" onClick={this.updatingTask}></input>
                            </div>
                        </div>
                    }
                    </div>
                </div>
                :''
            }
            </div>
        )
    }
}

export default Overlays;
