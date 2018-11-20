import React, { Component } from 'react';
import '../styles/style.css';
import SideMenu from './sideMenu';
import Header from './header';
import {CustomInputText, CustomDropdown} from './inputComponents';
import {postService,getService} from '../services/base_service';
import {properties} from '../properties';
import $ from 'jquery';
import Alerts from './alerts';
import Loader from './loader';

class AddDept extends Component {
    constructor(props, context){
        super(props, context)
        this.state = {
            hodEmps : [],
            alertActivity : '',
            isLoad: true
        }

        this.addDepartment = this.addDepartment.bind(this);
    }

    componentDidMount(){
        var hodProperty = properties.getHodEmployees;
        var dataObj = {};
        var _that = this;
        getService(hodProperty,dataObj).done(function(res){
            console.log(res.data[0]);
            var data = res.data;
            _that.setState({
                hodEmps:data,
                isLoad: false
            });
        })
    }

    addDepartment(){
        var property_data = properties;
        var url = property_data.addDepartment;
        var dept = $('#addDeptTxt').val()
        var hodId = $('#selectHod option:selected');
        var dataObj = {DepartmentName:dept,HodId:hodId.attr('id')};
        var _that = this;
        this.setState({
            isLoad: true
        })
        if(dept && hodId){
            postService(url,dataObj).done(function(res){
                _that.setState({
                    alertActivity : 'success',
                    isLoad: false
                });
                $('#addDeptTxt').val('');
                $("#selectHod").val('1');
            });
        } else {
            this.setState({alertActivity : 'error'})
        }
    }

    render() {
        var options = this.state.hodEmps.map((data,index) =>(
            <option key={index} id={data.UserId}>
                {data.UserName}
            </option>
        ))
        return (
            <div>
                <Header />
                <div className="container">
                    <SideMenu />
                    <div className="data-container">
                        <Alerts activity={this.state.alertActivity}/>
                        <h3 className="main-menu-name">Home / Add Department</h3>
                        <h2 className="welcome-text">Add Department</h2>
                        <hr />
                        <CustomInputText fieldName="Add Department" id="addDeptTxt"/>
                        <CustomDropdown fieldName="HOD" id="selectHod" optName="Select HOD" data={options}/>
                        <input type="button" value="submit" id="btnSubmit" onClick={this.addDepartment}></input>
                        <Loader isLoad={this.state.isLoad}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddDept;