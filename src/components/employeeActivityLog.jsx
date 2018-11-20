import { Component } from 'react';
import { properties } from './../properties';

class EmployeeActivityLog extends Component{
    state = {
        employeeList:[]
    }

    constructor(){

    }
    async getDataFromApi(){
        var _that = this;
        var dataObj = {};

        await postService(properties.getEmployeeList,dataObj).done(function(res){
            var data = res.data;
            _that.setState({
                employeeList: data,
            })
        });
        this.setState({
            isLoad : false
        })
    }
}

export default EmployeeActivityLog;