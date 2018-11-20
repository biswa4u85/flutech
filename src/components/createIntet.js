import React, { Component } from 'react';
import '../styles/style.css';
import SideMenu from './sideMenu';
import Header from './header';
import {CustomAutocomplete, CustomDropdown, CustomInputText} from './inputComponents';
import {postService,getService} from '../services/base_service';
import {properties} from '../properties';
import $ from 'jquery';
import Loader from './loader';
import Alerts from './alerts';

class AddDept extends Component {
    constructor(props, context){
        super(props, context)
        this.state = {
            sitesList : [],
            contractors : [],
            materialType : [],
            materialName : [],
            materialVariant : [],
            isLoad: false,
            alertActivity : ''
        }

        this.addNewIntent = this.addNewIntent.bind(this);
        this.getAutocompleteVal = this.getAutocompleteVal.bind(this);
    }

    componentDidMount(){
        var siteProperty = properties.getSiteList;
        var contraProperty = properties.getContractorsList;
        var materialTypeProp = properties.getMaterialType;
        var dataObj = {};
        var _that = this;
        getService(siteProperty,dataObj).done(function(res){
            var data = res.data;
            _that.setState({sitesList:data});
        })
        getService(contraProperty,dataObj).done(function(res){
            var data = res.data;
            _that.setState({contractors:data});
        })
        var matrDataObj = {
            "MaterialType": "",
            "MaterialName": "",
            "Variant": "",
            "Thick": "",
            "MaterialSize": "",
            "Colour": "",
            "CodeNo": "",
            "Make": ""
        }

        var matrlTypeObj = matrDataObj;
        matrlTypeObj.MaterialType = 'seafty';
        getService(materialTypeProp,matrlTypeObj).done(function(res){
            var data = res.data;
            _that.setState({materialType:data});
        })

        var mtrlNameObj = matrDataObj;
        mtrlNameObj.MaterialType = '';
        mtrlNameObj.MaterialName = 'seaftey';
        getService(materialTypeProp,mtrlNameObj).done(function(res){
            var data = res.data;
            _that.setState({materialName:data});
        })

        var mtrlVariantObj = matrDataObj;
        mtrlVariantObj.MaterialType = '';
        mtrlVariantObj.MaterialName = '';
        mtrlVariantObj.Variant = 'seaftey';
        getService(materialTypeProp,mtrlVariantObj).done(function(res){
            var data = res.data;
            _that.setState({materialVariant:data});
        })
    }

    getAutocompleteVal(e, item, matType) {
        $('.auto-complete').addClass('display-none');
        if(matType === 'materialType'){
            $('#selectMtrlType').val(item);
        }
        if(matType === 'materialName'){
            $('#selectMtrlName').val(item);
        }
        if(matType === 'variant'){
            $('#selectVariant').val(item);
        }
    }

    addNewIntent() {
        var siteName = $('#selectSite option:selected');
        var selectCont = $('#selectContractor option:selected');
        var mtrlType = $("#selectMtrlType").val();
        var mtelName = $("#selectMtrlName").val();
        var variant = $("#selectVariant").val();
        var thickness = $("#txtThickness").val();
        var mtrlSize = $("#txtMaterialSize").val();
        var colour = $("#txtColour").val();
        var codeNo = $("#txtCodeNo").val();
        var remarks = $("#txtRemarks").val();

        var mtrlJson = {
            MaterialType: mtrlType,
            MaterialName: mtelName,
            Variant: variant,
            Thick: thickness,
            MaterialSize: mtrlSize,
            Colour: colour,
            CodeNo: codeNo,
            Make: ""
        }

        var dataObj = {
            SiteId: siteName.attr('id'),
            ContractorId: selectCont.attr('id'),
            Remarks: remarks,
            MaterialJson: JSON.stringify(mtrlJson)
        }

        var intentProperty = properties.addIntent;
        var _that = this;
        this.setState({
            isLoad: true
        })

        postService(intentProperty, dataObj).done(function(res){
            _that.setState({
                isLoad: false,
                alertActivity: 'success'
            })
        })

    }

    render() {
        var siteOptions = this.state.sitesList.map((data, index) => (
            <option key={index} id={data.SiteId}>
                {data.SiteName}
            </option>
        ))

        var contractorOptions = this.state.contractors.map((data,index) =>(
            <option key={index} id={data.ContractorId}>
                {data.ContractorName}
            </option>
        ));

        var materialTypeOptions = this.state.materialType.map((data,index) =>(
            <li key={index} id={index} onClick={() => {this.getAutocompleteVal('', data.SearchItems,'materialType')}}>
                {data.SearchItems}
            </li>
        ));

        var materialNameOptions = this.state.materialName.map((data,index) =>(
            <li key={index} id={index} onClick={() => {this.getAutocompleteVal('', data.SearchItems,'materialName')}}>
                {data.SearchItems}
            </li>
        ));

        var variantOptions = this.state.materialVariant.map((data,index) =>(
            data.SearchItems !== '' && <li key={index} id={index} onClick={() => {this.getAutocompleteVal('', data.SearchItems,'variant')}}>
                {data.SearchItems}
            </li>
        ));

        return (
            <div>
                <Header />
                <div className="container">
                    <SideMenu />
                    <div className="data-container">
                        <Alerts activity={this.state.alertActivity}/>
                        <h3 className="main-menu-name">Home / Create Intent</h3>
                        <h2 className="welcome-text">Create Intent</h2>
                        <hr />
                        <div className="create-intent-container">
                            <div className="field-container">
                                <CustomDropdown fieldName="Select Site" id="selectSite" optName="Select Site" data={siteOptions} />
                                <CustomAutocomplete fieldName="Material Name" id="selectMtrlName" data={materialNameOptions}/>
                                <CustomInputText fieldName="Material Size" id="txtMaterialSize" />
                                <CustomInputText fieldName="Remarks" id="txtRemarks" />
                            </div>
                            <div className="field-container">
                                <CustomDropdown fieldName="Select Contractor" id="selectContractor" optName="Select Contractor" data={contractorOptions} />
                                <CustomAutocomplete fieldName="Variant" id="selectVariant" data={variantOptions}/>
                                <CustomInputText fieldName="Colour" id="txtColour" />
                            </div>
                            <div className="field-container">
                                <CustomAutocomplete fieldName="Material Type" id="selectMtrlType" data={materialTypeOptions}/>
                                <CustomInputText fieldName="Thickness" id="txtThickness" />
                                <CustomInputText fieldName="Code No" id="txtCodeNo" />
                            </div>
                        </div>
                        <div className="intent-list">
                            <input type="button" value="Submit" onClick={this.addNewIntent}></input>
                        </div>
                        <Loader isLoad={this.state.isLoad}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddDept;