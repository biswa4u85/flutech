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
import EmployeesList from './employeeList';

class SitesList extends Component {
    constructor(props, context){
        super(props, context)
        this.state = {
            alertActivity : '',
            sitesList: [],
            hodsList:[],
            employeesList:[],
            contractorsList:[],
            overlayData : '',
            isLoad: true,
            taskId: ''
        }
        this.getDataFromApi();
        
    }

    async getDataFromApi(){
        var _that = this;
        var dataObj = {};

        await postService(properties.getHodEmployees,dataObj).done(function(res){
            var data = res.data;
            _that.setState({
                hodsList: data,
            })
        });
        await postService(properties.getEmployeeList,dataObj).done(function(res){
            var data = res.data;
            _that.setState({
                employeesList: data,
            })
        });
        await postService(properties.getContractorsList,dataObj).done(function(res){
            var data = res.data;
            _that.setState({
                contractorsList: data,
            })
        });
        await postService(properties.getSiteList,dataObj).done(function(res){
            var data = res.data;
            _that.setState({
                sitesList: data,
            })
        });
        this.mapSitesList();
    }

    mapSitesList(){
        var _that = this;

        this.state.sitesList.filter(s=>{
            s.editing = false;
            _that.state.hodsList.forEach(h=>{
                if(h.UserId == s.AssignHodId){
                    s.hodName = h.UserName;
                }
            })
            console.log(`hodLists:${JSON.stringify(_that.state.hodsList)}`)
            
            _that.state.contractorsList.forEach(c=>{
                if(c.ContractorId == s.AssignContractorId){
                    s.contractorName = c.ContractorName;
                }
            })

            _that.state.employeesList.forEach(e=>{
                if(e.EmployeeId == s.AssignEmployeeId){
                    s.employeeName = e.EmployeeName;
                }
            })
            
        })
        
        this.setState({
            isLoad : false
        })
    }
    componentDidMount(){
        var dataObj = {};
        var assignId = getCookie('userId');
        


    }
    handleChange = (event)=> {
        let sites = this.state.sitesList.filter((e)=>{
            if(e.editing){
                e.SiteName =  event.target.value;
            }
            return e;
        })
        this.setState({sitesList: sites});
      }
    editSite = (index) => {

        this.state.sitesList[index].editing = !this.state.sitesList[index].editing;

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

    deleteSite = (index)=> {

        this.state.sitesList.splice(index,1);
         this.setState({
             overlayData: '',
         })
    }

    render() {
        
        var tblData = this.state.sitesList.map((data,index) => (
            <tr key={index}>
                <td>{index+1}</td>
                <td>{data.SiteId}</td>
                <td>
                    <input 
                        className={data.editing?"":" disabled"} 
                        type='text' value={data.SiteName}
                        disabled={!data.editing}
                        onChange={this.handleChange}
                        >
                    </input>
                </td>
                <td>{data.Address}</td>
                <td>{data.hodName}</td>
                <td>{data.employeeName}</td>
                <td>{data.contractorName}</td>
                <td>{data.Location_Url}</td>
                <td>{data.SetAlarm}</td>
                <td>
                    <span className={!data.editing ?"fas fa fa-pencil":"fas fa fa-check"} onClick={() => {this.editSite(index,data)}}></span>
                    <span className="fas fa fa-trash" onClick={() => {this.deleteSite(index,data)}}></span>
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
                        <h3 className="main-menu-name">Home / Sites List </h3>
                        <h2 className="welcome-text">Sites</h2>
                        <hr />
                        <br />
                        <table className="data-table">
                            <tbody>
                                <tr>
                                    <th>SI#</th>
                                    <th>Site Id</th>
                                    <th>Site Name</th>
                                    <th>Address</th>
                                    <th>HOD</th>
                                    <th>Employee</th>
                                    <th>Contractor</th>
                                    <th>Location Url</th>
                                    <th>Set Alarm</th>
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

export default SitesList;
