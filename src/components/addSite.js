import React, { Component } from 'react';
import '../styles/style.css';
import SideMenu from './sideMenu';
import Header from './header';
import {CustomInputText, CustomDropdown, CustomTime, CustomMultiSelection} from './inputComponents';
import {postService, getService} from '../services/base_service';
import {properties} from '../properties';
import $ from 'jquery';
import Alerts from './alerts';
import { getCookie } from '../utils';
import Loader from './loader';

class AddSite extends Component {
    constructor(props, context){
        super(props, context)
        this.state = {
            hodEmps : [],
            contractors : [],
            emps : [],
            isLoad: true,
            selectedEmpIds: [],
            selectedEmpNames: [],
            selectedHodIds: [],
            selectedHodNames: []
        }
        this.addSite = this.addSite.bind(this);
    }

    componentDidMount(){
        var coords = getCookie('coords');
        if(coords){
            $("#locationTxt").val(coords);
        }
        var hodProperty = properties.getHodEmployees;
        var empProperty = properties.getEmployeeList;
        var contraProperty = properties.getContractorsList;
        var dataObj = {};
        var _that = this;
        getService(hodProperty,dataObj).done(function(res){
            console.log(res.data[0]);
            var data = res.data;
            _that.setState({hodEmps:data});
        })
        getService(empProperty,dataObj).done(function(res){
            console.log(res.data[0]);
            var data = res.data;
            _that.setState({emps:data});
        })
        getService(contraProperty,dataObj).done(function(res){
            console.log(res.data[0]);
            var data = res.data;
            _that.setState({contractors:data, isLoad: false});
        })
    }

    addSite(){
        var property_data = properties;
        var url = property_data.addSite;
        var siteName = $("#sitenameTxt").val();
        var address = $("#addressTxt").val();
        var location = $("#locationTxt").val();
        var alrm = $("#alarmTxt").val();
        var assinEmp = this.state.selectedEmpIds;
        var assinCon = $("#assignContractor option:selected");
        var assinHod = this.state.selectedHodIds;
        var _that = this;
        this.setState({
            isLoad: true
        })
        if(siteName && address && location && alrm && assinEmp && assinCon && assinHod){
            var dataObj = {
                SiteName: siteName,
                Address: address,
                Location_Url: location,
                SetAlarm: alrm,
                AssignEmployeeId: assinEmp,
                AssignContractorId: assinCon.attr('id'),
                AssignHodId: assinHod
            };
            postService(url,dataObj).done(function(res){
                _that.setState({alertActivity : 'success',isLoad: false});
                $("#sitenameTxt").val('');
                $("#addressTxt").val('');
                $("#alarmTxt").val('');
                $("#assignEmployees").val('');
                $("#assignContractor").val('1');
                $("#assignHod").val('');
            });
        } else {
            this.setState({alertActivity : 'error', isLoad: false});
        }
    }

    selectEmployees = (e, empId, empName) => {
        $('#'+e.target.id).toggleClass('active');
        
        var indx = this.state.selectedEmpIds.indexOf(empId);
        if(indx == -1){
            this.state.selectedEmpIds.push(empId);
            this.state.selectedEmpNames.push(empName);
        } else {
            this.state.selectedEmpIds.splice(indx,1)
            this.state.selectedEmpNames.splice(indx,1)
        }
        
        this.setState({
            selectedEmpIds: this.state.selectedEmpIds,
            selectedEmpNames: this.state.selectedEmpNames
        },() => {
            $("#assignEmployees").val(this.state.selectedEmpNames);
        });
    }

    selectHods = (e, hodId, hodName) => {
        $('#'+e.target.id).toggleClass('active');

        var indx = this.state.selectedHodIds.indexOf(hodId);
        if(indx == -1){
            this.state.selectedHodIds.push(hodId);
            this.state.selectedHodNames.push(hodName);
        } else {
            this.state.selectedHodIds.splice(indx,1)
            this.state.selectedHodNames.splice(indx,1)
        }
        
        this.setState({
            selectedHodIds: this.state.selectedHodIds,
            selectedHodNames: this.state.selectedHodNames
        },() => {
            $("#assignHod").val(this.state.selectedHodNames);
        });
    }

    render() {
        var empOptions = this.state.emps.map((data,index) =>(
            <li key={index} id={'emp'+data.EmployeeId} onClick={(e) => this.selectEmployees(e, data.EmployeeId, data.EmployeeName)}>
                {data.EmployeeName}
            </li>
        ));

        var contractorOptions = this.state.contractors.map((data,index) =>(
            <option key={index} id={data.ContractorId}>
                {data.ContractorName}
            </option>
        ));

        var hodOptions = this.state.hodEmps.map((data,index) =>(
            <li key={index} id={'hod'+data.UserId} onClick={(e) => this.selectHods(e, data.UserId, data.UserName)}>
                {data.UserName}
            </li>
        ));

        return (
            <div>
                <Header />
                <div className="container">
                    <SideMenu />
                    <div className="data-container">
                        <Alerts activity={this.state.alertActivity}/>
                        <h3 className="main-menu-name">Home / Add Site</h3>
                        <h2 className="welcome-text">Add Site</h2>
                        <hr />
                        <div className="field-container">
                            <CustomInputText fieldName="Site Name" id="sitenameTxt"/>
                            <CustomInputText fieldName="Address" id="addressTxt"/>
                            <CustomInputText fieldName="Attach Current Location" id="locationTxt"/>
                            <CustomMultiSelection fieldName="Assigne HOD" id="assignHod" optName="Assign" data={hodOptions}/><br/>
                        </div>
                        <div className="field-container">
                            <CustomMultiSelection fieldName="Assigne Employees" id="assignEmployees" data={empOptions}/>
                            <CustomDropdown fieldName="Assigne Contractor" id="assignContractor" optName="Assign" data={contractorOptions}/>
                            <CustomTime fieldName="Set Alarm" id="alarmTxt"/>
                            <input type="button" value="submit" id="btnSubmit" onClick={this.addSite}></input>
                        </div>
                        <Loader isLoad={this.state.isLoad} />
                    </div>
                </div>
            </div>
        )
    }
}

export default AddSite;