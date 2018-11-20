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

class SuppliersList extends Component {
    constructor(props, context){
        super(props, context)
        this.state = {
            alertActivity : '',
            suppliersList:[],
            overlayData : '',
            isLoad: true,
            taskId: ''
        }
        this.getDataFromApi();
        
    }

    async getDataFromApi(){
        var _that = this;
        var dataObj = {};

        await postService(properties.getSupplierList,dataObj).done(function(res){
            var data = res.data.filter(s=>{
                s.editing = false;
                return s;
            });
            _that.setState({
                suppliersList: data,
            })
        });
        this.setState({
            isLoad : false
        })
    }

    componentDidMount(){
        var dataObj = {};
        var assignId = getCookie('userId');

    }
    handleChange = (event)=> {
        let suppliers = this.state.suppliersList.filter((e)=>{
            if(e.editing){
                e.supplierIdName =  event.target.value;
            }
            return e;
        })
        this.setState({suppliersList: suppliers});
      }
    editSupplier = (index) => {

        this.state.suppliersList[index].editing = !this.state.suppliersList[index].editing;

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

    deleteSupplier = (index)=> {

        this.state.suppliersList.splice(index,1);
         this.setState({
             overlayData: '',
         })
    }

    render() {
        
        var tblData = this.state.suppliersList.map((data,index) => (
            <tr key={index}>
                <td>{index+1}</td>
                <td>
                    <input 
                        className={data.editing?"":" disabled"} 
                        type='text' value={data.supplierIdName}
                        disabled={!data.editing}
                        onChange={this.handleChange}
                        >
                    </input>
                </td>
                <td>{data.UserType}</td>
                <td>{data.Address}</td>
                <td>{data.MobileNumber}</td>
                <td>{data.EmailID}</td>
                <td>{data.GST}</td>
                <td>{data.UplaodPriceListURL}</td>
                <td>
                    <span className={!data.editing ?"fas fa fa-pencil":"fas fa fa-check"} onClick={() => {this.editSupplier(index,data)}}></span>
                    <span className="fas fa fa-trash" onClick={() => {this.deleteSupplier(index,data)}}></span>
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
                        <h3 className="main-menu-name">Home / Supplier List </h3>
                        <h2 className="welcome-text">Suppliers</h2>
                        <hr />
                        <br />
                        <table className="data-table">
                            <tbody>
                                <tr>
                                    <th>SI#</th>
                                    <th>Supplier Name</th>
                                    <th>User Type</th>
                                    <th>Address</th>
                                    <th>Mpbile No</th>
                                    <th>Email Id</th>
                                    <th>GST </th>
                                    <th>Price List Url</th>
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

export default SuppliersList;
