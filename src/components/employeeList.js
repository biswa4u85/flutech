import React, { Component } from 'react';
import '../styles/style.css';
import SideMenu from './sideMenu';
import Header from './header';
import {postService,getService} from '../services/base_service';
import {properties} from '../properties';
import Alerts from './alerts';
import Loader from './loader';
import Overlays from './overlays';
import {getCookie, dateFormat} from '../utils';
import { CustomInputText } from './inputComponents';

class EmployeesList extends Component {
    constructor(props, context){
        super(props, context)
        this.state = {
            alertActivity : '',
            employeesList: [],
            overlayData : '',
            isLoad: true,
            taskId: ''
        }

    }

    componentDidMount(){
        var property_data = properties;
        var url = property_data.getEmployeeList;
        var dataObj = {};
        var assignId = getCookie('userId');
        var _that = this;

        // var dataObj = {
        //     EmployeeId: assignId,
        // };
        postService(url,dataObj).done(function(res){
            var data = res.data.map((d)=>{
                d.editing = false;
                return d;
            })
            _that.setState({
                employeesList: data,
                isLoad: false
            });
        });
    }

    handleChange = (event)=> {
        let emps = this.state.employeesList.filter((e)=>{
            if(e.editing){
                e.EmployeeName =  event.target.value;
            }
            return e;
        })
        this.setState({employeesList: emps});
      }
    editEmployee = (index,employee) => {

        this.state.employeesList[index].editing = !this.state.employeesList[index].editing;

        // this.state.employeesList.filter((e)=>{
        //     if(e.EmployeeId === employee.EmployeeId){
        //         e.editing = true;
        //     }
        //     return e;
        // })
        this.setState({
            overlayData:'',
            // isLoad: true,
        });
        //var _that = this;
        // var url = properties.statusHistory;
        // var dataObj = {
        //     "TaskStatusId": 1,
        //     "AssignID": assignId,
        //     "StatusId": statusId,
        //     "CreatedDate": new Date().toISOString()
        // }

        // postService(url,dataObj).done(function(res){
        //     var data = res.data;
        //     console.log(data);
        //     _that.setState({
        //         alertActivity: 'updated',
        //         isLoad: false
        //     });
        // });

    }

    deleteEmployee = (index,employee)=> {

        this.state.employeesList.splice(index,1);
         this.setState({
             overlayData: '',
         })
    }

    render() {
        
        var tblData = this.state.employeesList.map((data,index) => (
            <tr key={index}>
                <td>{index+1}</td>
                <td>{data.EmployeeId}</td>
                <td>
                    <input 
                        className={data.editing?"":" disabled"} 
                        type='text' value={data.EmployeeName}
                        disabled={!data.editing}
                        onChange={this.handleChange}
                        >
                    </input>
                </td>
                <td>
                    <span className={!data.editing ?"fas fa fa-pencil":"fas fa fa-check"} onClick={() => {this.editEmployee(index,data)}}></span>
                    <span className="fas fa fa-trash" onClick={() => {this.deleteEmployee(index,data)}}></span>
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
                        <h3 className="main-menu-name">Home / Employees List</h3>
                        <h2 className="welcome-text">Employees </h2>
                        <hr />
                        <br />
                        <table className="data-table">
                            <tbody>
                                <tr>
                                    <th>SI#</th>
                                    <th>Employee Id</th>
                                    <th>Employee Name</th>
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

export default EmployeesList;
