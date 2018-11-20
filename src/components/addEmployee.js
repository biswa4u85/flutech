import React, { Component } from 'react';
import '../styles/style.css';
import SideMenu from './sideMenu';
import Header from './header';
import {CustomInputText, CustomDropdown, CustomDate, CustomTextArea} from './inputComponents';
import {postService, getService} from '../services/base_service';
import {properties} from '../properties';
import $ from 'jquery';
import Loader from './loader';
import Alerts from './alerts';

class AddEmployee extends Component {
    constructor(props, context){
        super(props, context)
        this.state = {
            hodEmps : [],
            contractors : [],
            emps : [],
            employeeTypeList : [],
            deptLst : [],
            gndrList : [],
            isLoad: false,
            alertActivity: '',
            formFields : {},
            formErrors:{}
        }
        this.addEmployee = this.addEmployee.bind(this);
    }

    componentDidMount(){
        var hodProperty = properties.getHodEmployees;
        var empProperty = properties.getEmployeeList;
        var empTypeProperty = properties.getEmployeeTypes;
        var deptProperty = properties.getDepartmentList;
        var dataObj = {};
        var _that = this;

        getService(hodProperty,dataObj).done(function(res){
            var data = res.data;
            _that.setState({hodEmps:data});
        })

        getService(empTypeProperty,dataObj).done(function(res){
            var data = res.data;
            _that.setState({employeeTypeList:data});
        })
        
        getService(deptProperty,dataObj).done(function(res){
            var data = res.data;
            _that.setState({deptLst:data});
        })
    }

    validate = () =>{
        let isErr = false;
        const errs = {
            loginIdError : '',
            employeeNameError : '',
            employeeTypeIdError : '',
            deptIdError : '',
            hodIdError : '',
            personalContactError : ''
        };

        if(!this.state.formFields.LoginID){   
            isErr = true;
            errs.loginIdError='Login Id is Required';
        }
        if(!this.state.formFields.EmployeeName){
            isErr = true;
            errs.employeeNameError='Employee name is Required';
        }
        if(!this.state.formFields.EmployeeTypeId.attr('id')){
            isErr = true;
            errs.employeeTypeIdError='Employee Type is Required';
        }
        if(!this.state.formFields.DeptId.attr('id')){
            isErr = true;
            errs.deptIdError='Department is Required';
        }
        if(!this.state.formFields.HODId.attr('id') ){
            isErr = true;
            errs.hodIdError='HOD is Required';
        }
        if(!this.state.formFields.PersonalContact){
            isErr = true;
            errs.personalContactError='Personal Contact is Required';
        }

        this.setState({
            formErrors:errs
          })
        return isErr;
    }
    addEmployee(){
        var property_data = properties;
        var url = property_data.addEmployee;
        var LoginID = $("#loginIDTxt").val();
        var EmployeeName = $("#employeeNameTxt").val();
        var EmployeeTypeId = $("#employeeTypeId option:selected");
        var JoiningDate = $("#joiningDate").val();
        var DOB = $("#dobdt").val();
        var DeptId = $("#assignDepartment option:selected");
        var HODId = $("#hodIdTxt option:selected");
        var Gender = $("#genderID option:selected");
        var PersonalContact = $("#personalContactTxt").val();
        var Personal_EmailId = $("#personal_EmailIdTxt").val();
        var Official_EmailID = $("#official_EmailIDTxt").val();
        var PermanentAddres = $("#permanentAddresTxt").val();
        var CurrentAddres = $("#CurrentAddresTxt").val();
        var OfficialContactNumber = $("#officialContactNumberTxt").val();
        var Extension = $("#extensionTxt").val();
        var EmergencyWithRelationship = $("#emergencyWithRelationshipTxt").val();
        var PanNO = $("#panNoTxt").val();
        var Aadhar = $("#aadharTxt").val();
        var VoterID = $("#voterIDTxt").val();
        var Personel_Acc_Details = $("#personel_Acc_DetailsTct").val();
        var BloodGroup = $("#bloodGroupTxt").val();
        var EducationCertificates = $("#educationCertificateTxt").val();
        var OtherDocuments = $("#otherCertificateTxt").val();
        var FathersName = $("#fathersNameTxt").val();
        var MothersName = $("#motherNameTxt").val();
        var UAN_No = $("#uAN_NoTxt").val();
        var ESINo = $("#eSINoTxt").val();
        var AppointmentLetterIssued = $("#appointmentLetterIssueddt").val();
        var ConfirmationLetterIssued = $("#confirmationLetterIssueddt").val();

        let fields = {
             LoginID : $("#loginIDTxt").val(),
             EmployeeName : $("#employeeNameTxt").val(),
             EmployeeTypeId : $("#employeeTypeId option:selected"),
             DeptId : $("#assignDepartment option:selected"),
             HODId : $("#hodIdTxt option:selected"),
             PersonalContact : $("#personalContactTxt").val(),
        }
        
        this.setState({
            isLoad: true,
            formFields:fields},
            ()=>{
                let err = this.validate();
                var dataObj = {
                    LoginID: LoginID,
                    EmployeeName: EmployeeName,
                    EmployeeTypeId: EmployeeTypeId.attr('id'),
                    JoiningDate: JoiningDate,
                    DOB: DOB,
                    DeptId: DeptId.attr('id'),
                    HODId: HODId.attr('id'),
                    Gender: Gender.attr('id'),
                    PersonalContact: PersonalContact,
                    Personal_EmailId: Personal_EmailId,
                    Official_EmailID: Official_EmailID,
                    PermanentAddres: PermanentAddres,
                    CurrentAddres: CurrentAddres,
                    OfficialContactNumber: OfficialContactNumber,
                    Extension: Extension,
                    EmergencyWithRelationship: EmergencyWithRelationship,
                    PanNO: PanNO,
                    Aadhar: Aadhar,
                    VoterID: VoterID,
                    Personel_Acc_Details: Personel_Acc_Details,
                    BloodGroup: BloodGroup,
                    EducationCertificates: EducationCertificates,
                    OtherDocuments: OtherDocuments,
                    FathersName: FathersName,
                    MothersName: MothersName,
                    UAN_No: UAN_No,
                    ESINo: ESINo,
                    AppointmentLetterIssued: AppointmentLetterIssued,
                    ConfirmationLetterIssued: ConfirmationLetterIssued
                };
                var _that = this;
                if(!err){
                    postService(url,dataObj).done(function(res){
                        _that.setState({
                            alertActivity: 'success',
                            isLoad: false
                        })
                        $("#loginIDTxt").val('');
                        $("#employeeNameTxt").val('');
                        $("#employeeTypeId").val('1');
                        $("#joiningDate").val('');
                        $("#dobdt").val('');
                        $("#assignDepartment").val('1');
                        $("#hodIdTxt").val('1');
                        $("#genderID").val('1');
                        $("#personalContactTxt").val('');
                        $("#personal_EmailIdTxt").val('');
                        $("#official_EmailIDTxt").val('');
                        $("#permanentAddresTxt").val('');
                        $("#CurrentAddresTxt").val('');
                        $("#officialContactNumberTxt").val('');
                        $("#extensionTxt").val('');
                        $("#emergencyWithRelationshipTxt").val('');
                        $("#panNoTxt").val('');
                        $("#aadharTxt").val('');
                        $("#voterIDTxt").val('');
                        $("#personel_Acc_DetailsTct").val('');
                        $("#bloodGroupTxt").val('');
                        $("#educationCertificateTxt").val('');
                        $("#otherCertificateTxt").val('');
                        $("#fathersNameTxt").val('');
                        $("#motherNameTxt").val('');
                        $("#uAN_NoTxt").val('');
                        $("#eSINoTxt").val('');
                        $("#appointmentLetterIssueddt").val('');
                        $("#confirmationLetterIssueddt").val('');
                    })
                }
                else{
                    this.setState({
                        //alertActivity:'emp-error',
                        isLoad: false
                    });
                }
            }
        )
       
        
        

        
       
    }

    render() {

        var empOptions = this.state.emps.map((data,index) =>(
            <option key={index} id={data.EmployeeId}>
                {data.EmployeeName}
            </option>
        ));

        var employeeTypeOptions = this.state.employeeTypeList.map((data,index) =>(
            <option key={index} id={data.Id}>
                {data.EmployeeType}
            </option>
        ));

        var hodOptions = this.state.hodEmps.map((data,index) =>(
            <option key={index} id={data.UserId}>
                {data.UserName}
            </option>
        ));
        
        var deptOptions = this.state.deptLst.map((data,index) =>(
            <option key={index} id={data.DeptId}>
                {data.DepartmentName}
            </option>
        ));

        return (
            <div>
                <Header />
                <div className="container">
                    <SideMenu />
                    <div className="data-container emp-container">
                        <Alerts activity={this.state.alertActivity}/>
                        <div className="emp-loader">
                            <Loader isLoad={this.state.isLoad} />
                        </div>
                        <h3 className="main-menu-name">Home / Add Employee</h3>
                        <h2 className="welcome-text">Add Employee</h2>
                        <hr />
                        <div className="employee-container">
                            <div className="field-container">
                                <CustomInputText 
                                    fieldName="LoginID" 
                                    id="loginIDTxt" 
                                    Required={true} 
                                    errorText = {this.state.formErrors.loginIdError}
                                    />
                                <CustomInputText 
                                    fieldName="Employee Name" 
                                    id="employeeNameTxt"
                                    Required={true} 
                                    errorText = {this.state.formErrors.employeeNameError}
                                    />
                                <CustomDropdown 
                                    fieldName="Employee Type " 
                                    id="employeeTypeId" 
                                    optName="Assign" 
                                    data={employeeTypeOptions}
                                    Required={true} 
                                    errorText = {this.state.formErrors.employeeTypeIdError}/>

                                <CustomDate 
                                    fieldName="Joining Date" 
                                    id="joiningDate"
                                    />

                                <CustomDate fieldName="DOB" id="dobdt"/>
                                <CustomInputText 
                                    fieldName="Personal Contact" 
                                    id="personalContactTxt"
                                    Required={true} 
                                    errorText = {this.state.formErrors.personalContactError}
                                    />

                                <CustomInputText fieldName="Personal Email Id" id="personal_EmailIdTxt"/>
                                <CustomInputText fieldName="Official Contact" id="official_EmailIDTxt"/>
                            </div>

                            <div className="field-container">
                                <CustomInputText fieldName="Official Contact Number" id="officialContactNumberTxt"/>
                                <CustomInputText fieldName="Extension" id="extensionTxt"/>
                                <CustomInputText fieldName="Father Name" id="fathersNameTxt"/>
                                <CustomInputText fieldName="Mother Name" id="motherNameTxt"/>
                                <CustomInputText fieldName="Voter ID" id="voterIDTxt"/>
                                <CustomInputText fieldName="ESINo" id="eSINoTxt"/>
                                <CustomDate fieldName="Appointment Letter Issued" id="appointmentLetterIssueddt"/>
                                <CustomDate fieldName="Confirmation Letter Issued" id="confirmationLetterIssueddt"/>
                            </div>

                            <div className="field-container">
                                <CustomDropdown 
                                    fieldName="Department" 
                                    id="assignDepartment" 
                                    optName="Assign" 
                                    data={deptOptions}
                                    Required={true} 
                                    errorText = {this.state.formErrors.deptIdError}
                                    />
                                <CustomDropdown 
                                    fieldName="HOD" 
                                    id="hodIdTxt" 
                                    optName="Assign" 
                                    data={hodOptions}
                                    Required={true} 
                                    errorText = {this.state.formErrors.hodIdError}
                                    />
                                <div className="select-box">
                                    <span>Gender</span><br/>
                                    <select id="genderID">
                                        <option>Select Gender</option>
                                        <option id='M'>Male</option>
                                        <option id='F'>FeMale</option>
                                    </select>
                                </div>
                                <CustomTextArea fieldName="Permanent Addres" id="permanentAddresTxt"/>
                                <CustomTextArea fieldName="Current Addres" id="CurrentAddresTxt"/>
                            </div>
                            
                            <div className="field-container">
                                <CustomInputText fieldName="Emergency With Relationship" id="emergencyWithRelationshipTxt"/>
                                <CustomInputText fieldName="Pan NO" id="panNoTxt"/>
                                <CustomInputText fieldName="Aadhar" id="aadharTxt"/>
                                <CustomInputText fieldName="Personel Account Details" id="personel_Acc_DetailsTct"/>
                                <CustomInputText fieldName="Blood Group" id="bloodGroupTxt"/>
                                <CustomInputText fieldName="Education Certificates" id="educationCertificateTxt"/>
                                <CustomInputText fieldName="Other Certificates" id="otherCertificateTxt"/>
                                <CustomInputText fieldName="UAN No" id="uAN_NoTxt"/>
                                <input type="button" value="submit" id="btnSubmit" onClick={this.addEmployee}></input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddEmployee;