import React, { Component } from 'react';
import '../styles/style.css';
import SideMenu from './sideMenu';
import Header from './header';
import {CustomInputText, CustomDropdown, CustomTextArea} from './inputComponents';
import {postService, getService} from '../services/base_service';
import {properties} from '../properties';
import $ from 'jquery';
import Alerts from './alerts';
import Loader from './loader';

class AddContractor extends Component {
    constructor(props, context){
        super(props, context)
        this.state = {
            workUserType: [],
            contractors : [],
            isLoad: true
        }
        this.addContractor = this.addContractor.bind(this);
    }

    componentDidMount(){
        var workType = properties.getUserTypes;
        var contraProperty = properties.getContractorsList;
        var dataObj = {};
        var _that = this;
        getService(workType,dataObj).done(function(res){
            console.log(res.data[0]);
            var data = res.data;
            _that.setState({workUserType:data, isLoad: false});
        })
        // getService(contraProperty,dataObj).done(function(res){
        //     console.log(res.data[0]);
        //     var data = res.data;
        //     _that.setState({contractors:data});
        // })
    }

    addContractor(){
        var property_data = properties;
        var url = property_data.addContractor;

        var workType = $("#workType option:selected");
        var conName = $("#contractorName").val();
        var address = $("textarea#addressTxt").val();
        var mobNum = $("#phoneTxt").val();
        var mailId = $("#emailTxt").val();
        var gstNum = $("#gstTxt").val();
        var priceList = $("#priceAttachment").val();

        this.setState({isLoad: true});

        var _that = this;
        if(workType && conName && address && mobNum && mailId && gstNum && priceList){
            var dataObj = {
                UserTypeId: workType.attr('id'),
                ContractorName: conName,
                Address: address,
                MobileNumber: mobNum,
                EmailID: mailId,
                GST: gstNum,
                UplaodPriceListURL: priceList
            };
            postService(url,dataObj).done(function(res){
                _that.setState({
                    alertActivity : 'success',
                    isLoad: false
                })
                $("#workType").val('1');
                $("#contractorName").val('');
                $("#addressTxt").val('');
                $("#phoneTxt").val('');
                $("#emailTxt").val('');
                $("#gstTxt").val('');
                $("#priceAttachment").val('');
            });
        } else {
            this.setState({
                alertActivity : 'error',
                isLoad: false
            });
        }
    }

    render() {
        var workOptions = this.state.workUserType.map((data,index) =>(
            <option key={index} id={data.Id}>
                {data.UserType}
            </option>
        ));

        return (
            <div>
                <Header />
                <div className="container">
                    <SideMenu />
                    <div className="data-container">
                        <Alerts activity={this.state.alertActivity}/>
                        <h3 className="main-menu-name">Home / Add Contractor</h3>
                        <h2 className="welcome-text">Add Contractor</h2>
                        <hr />
                        <div className="field-container">
                            <CustomDropdown fieldName="Type of Work" id="workType" optName="Assign" data={workOptions}/>
                            <CustomInputText fieldName="Contractor Name" id="contractorName"/>
                            <CustomTextArea fieldName="Address" id="addressTxt"/>
                        </div>
                        <div className="field-container">
                            <CustomInputText fieldName="Mobile Number" id="phoneTxt"/>
                            <CustomInputText fieldName="Email id" id="emailTxt"/>
                            <CustomInputText fieldName="GST #" id="gstTxt"/>
                            <CustomInputText fieldName="Upload Price List" id="priceAttachment"/>
                            <input type="button" value="submit" id="btnSubmit" onClick={this.addContractor}></input>
                        </div>
                        <Loader isLoad={this.state.isLoad} />
                    </div>
                </div>
            </div>
        )
    }
}

export default AddContractor;