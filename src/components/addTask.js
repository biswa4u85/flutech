import React, { Component } from 'react';
import '../styles/style.css';
import SideMenu from './sideMenu';
import Header from './header';
import {CustomDate, CustomDropdown, CustomTextArea} from './inputComponents';
import {postService,getService} from '../services/base_service';
import {properties} from '../properties';
import $ from 'jquery';
import Alerts from './alerts';
import Loader from './loader';

class AddDept extends Component {
    constructor(props, context){
        super(props, context)
        this.state = {
            deptLst : [],
            alertActivity : '',
            emps: [],
            isLoad: true
        }

        this.addTask = this.addTask.bind(this);
        this.getCookie = this.getCookie.bind(this);
    }

    componentDidMount(){

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
            _that.setState({emps:data, isLoad:false});
        })

    }

    addTask(){
        var property_data = properties;
        var url = property_data.addTask;
        var strtDt = new Date($('#addStartDt').val()).toISOString();
        var endDt = new Date($('#addEndDt').val()).toISOString();
        var deptName = $("#deptName option:selected");
        var assignTo = $("#assignTo option:selected");
        var desc = $("#taskDesc").val();
        var assignId = this.getCookie('userId');
        var _that = this;

        if(assignId && strtDt && endDt && deptName.attr('id') && assignTo.attr('id') && desc){
            var dataObj = {
                AssignerId: assignId,
                CreatedDate: new Date().toISOString(),
                StartDate: strtDt,
                EndDate: endDt,
                DepartmentId: deptName.attr('id'),
                AssignTo: assignTo.attr('id'),
                Description: desc,
                StatusId: 9,
                UpdateStatus: 0
            };
            this.setState({isLoad: true})
            postService(url,dataObj).done(function(res){
                $('#addStartDt').val('');
                $('#addEndDt').val('');
                $("#deptName").val('1');
                $("#assignTo").val('1');
                $("#taskDesc").val('');
                _that.setState({
                    alertActivity : 'success',
                    isLoad: false
                });
            });
        } else {
            this.setState({alertActivity : 'error'})
        }
    }

    getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    render() {
        var deptOptions = this.state.deptLst.map((data,index) =>(
            <option key={index} id={data.DeptId}>
                {data.DepartmentName}
            </option>
        ));

        var empOptions = this.state.emps.map((data,index) =>(
            <option key={index} id={data.EmployeeId}>
                {data.EmployeeName}
            </option>
        ));

        return (
            <div>
                <Header />
                <div className="container">
                    <SideMenu />
                    <div className="data-container">
                        <Alerts activity={this.state.alertActivity}/>
                        <h3 className="main-menu-name">Home / Assign Task</h3>
                        <h2 className="welcome-text">Assign Task</h2>
                        <hr />
                        <div className="field-container">
                            <CustomDate fieldName="Start Date" id="addStartDt" />
                            <CustomDate fieldName="End Date" id="addEndDt"/>
                            <CustomDropdown fieldName="Department Name" id="deptName" optName="Select Department" data={deptOptions}/>
                        </div>
                        <div className="field-container">
                            <CustomDropdown fieldName="Assigned To" id="assignTo" optName="Assign" data={empOptions}/>
                            <CustomTextArea fieldName="Task Description" id="taskDesc"/>
                        </div>
                        <div>
                            <input type="button" value="submit" id="btnSubmit" onClick={this.addTask}></input>
                        </div>
                        <br />
                        <Loader isLoad={this.state.isLoad}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddDept;