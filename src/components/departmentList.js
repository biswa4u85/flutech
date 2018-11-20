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

class DepartmentsList extends Component {
    constructor(props, context){
        super(props, context)
        this.state = {
            alertActivity : '',
            departmentsList: [],
            hodsList:[],
            overlayData : '',
            isLoad: true,
            taskId: ''
        }

    }

    componentDidMount(){
        var property_data = properties;
        var deptUrl = property_data.getDepartmentList;
        var hodUrl = property_data.getHodEmployees;
        var dataObj = {};
        var assignId = getCookie('userId');
        var _that = this;

        // var dataObj = {
        //     EmployeeId: assignId,
        // };
        
        postService(hodUrl,dataObj).done(function(res){
            var data = res.data;
            _that.setState({
                hodsList: data,
            },
            ()=>{
                postService(deptUrl,dataObj).done(function(res){
                    var data = res.data.map((d)=>{
                        d.editing = false;
                       
                        let hod = _that.state.hodsList.filter(h=>{
                            if(h.UserId === d.HodId){
                                return h;
                            }
                        });
                        d.HodName = hod.length >0 ? hod[0].UserName:"";
                        return d;
                    })
                    _that.setState({
                        departmentsList: data,
                        isLoad: false
                    });
                });
            });
        });
    }

    handleChange = (event)=> {
        let depts = this.state.departmentsList.filter((e)=>{
            if(e.editing){
                e.DepartmentName =  event.target.value;
            }
            return e;
        })
        this.setState({departmentsList: depts});
      }
    editDepartment = (index) => {

        this.state.departmentsList[index].editing = !this.state.departmentsList[index].editing;

        // this.state.departmentsList.filter((e)=>{
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

    deleteDepartment = (index)=> {

        this.state.departmentsList.splice(index,1);
         this.setState({
             overlayData: '',
         })
    }

    render() {
        
        var tblData = this.state.departmentsList.map((data,index) => (
            <tr key={index}>
                <td>{index+1}</td>
                <td>{data.DeptId}</td>
                <td>
                    <input 
                        className={data.editing?"":" disabled"} 
                        type='text' value={data.DepartmentName}
                        disabled={!data.editing}
                        onChange={this.handleChange}
                        >
                    </input>
                </td>
                <th>{data.HodName}</th>
                <td>
                    <span className={!data.editing ?"fas fa fa-pencil":"fas fa fa-check"} onClick={() => {this.editDepartment(index,data)}}></span>
                    <span className="fas fa fa-trash" onClick={() => {this.deleteDepartment(index,data)}}></span>
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
                        <h3 className="main-menu-name">Home / Departments List </h3>
                        <h2 className="welcome-text">Departments</h2>
                        <hr />
                        <br />
                        <table className="data-table">
                            <tbody>
                                <tr>
                                    <th>SI#</th>
                                    <th>Department Id</th>
                                    <th>Department Name</th>
                                    <th>HOD</th>
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

export default DepartmentsList;
