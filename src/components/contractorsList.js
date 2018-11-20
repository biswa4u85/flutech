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

class ContractorsList extends Component {
    constructor(props, context){
        super(props, context)
        this.state = {
            alertActivity : '',
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

        await postService(properties.getContractorsList,dataObj).done(function(res){
            var data = res.data.filter(c=>{
                c.editing = false;
                return c;
            });
            _that.setState({
                contractorsList: data,
            })
        });
        this.setState({
            isLoad : false
        },
        ()=>{
            console.log(JSON.stringify(this.state))
        })
    }

    componentDidMount(){
        var dataObj = {};
        var assignId = getCookie('userId');

    }
    handleChange = (event)=> {
        let contractors = this.state.contractorsList.filter((e)=>{
            if(e.editing){
                e.SiteName =  event.target.value;
            }
            return e;
        })
        this.setState({contractorsList: contractors});
      }
    editContractor = (index) => {

        this.state.contractorsList[index].editing = !this.state.contractorsList[index].editing;

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

    deleteContractor = (index)=> {

        this.state.contractorsList.splice(index,1);
         this.setState({
             overlayData: '',
         })
    }

    render() {
        
        var tblData = this.state.contractorsList.map((data,index) => (
            <tr key={index}>
                <td>{index+1}</td>
                <td>
                    <input 
                        className={data.editing?"":" disabled"} 
                        type='text' value={data.ContractorName}
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
                    <span className={!data.editing ?"fas fa fa-pencil":"fas fa fa-check"} onClick={() => {this.editContractor(index,data)}}></span>
                    <span className="fas fa fa-trash" onClick={() => {this.deleteContractor(index,data)}}></span>
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
                        <h3 className="main-menu-name">Home / Contrators List </h3>
                        <h2 className="welcome-text">Contrators</h2>
                        <hr />
                        <br />
                        <table className="data-table">
                            <tbody>
                                <tr>
                                    <th>SI#</th>
                                    <th>Contractor Name</th>
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

export default ContractorsList;
