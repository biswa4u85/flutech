import React, { Component } from 'react';
import '../styles/inputs.css';
import $ from 'jquery';

export class  CustomInputText extends React.Component{
    constructor(props){
        super(props);
    }
    
    componentDidMount(){
        const props = this.props;
        if(props.value){
            $('#'+props.id).val(props.value);
        }
    }
    
    render() {
        return (
            <div className={"input-text " + (this.props.errorText ? "error" : "")}>
                <span>{this.props.fieldName} {this.props.Required ? '*':''}</span><br/>
                <input type="text" placeholder={this.props.fieldName} id={this.props.id} ></input><br/>
                <span>{this.props.errorText}</span>
            </div>
        )
    }
}

export class  CustomTime extends React.Component{
    constructor(props){
        super(props);
    }
    
    componentDidMount(){
        const props = this.props;
        if(props.value){
            $('#'+props.id).val(props.value);
        }
    }
    
    render() {
        return (
            <div className="input-text">
                <span>{this.props.fieldName}</span><br/>
                <input type="time" placeholder={this.props.fieldName} id={this.props.id}></input>
            </div>
        )
    }
}

export class  CustomAutocomplete extends React.Component{
    constructor(props){
        super(props);
    }
    
    componentDidMount(){
        const props = this.props;
        $('.auto-complete').addClass('display-none');
        var _that = this;
        $('#'+this.props.id).focus(function() {
            $('.auto-complete').addClass('display-none');
            $('#'+_that.props.id+' + .auto-complete').removeClass('display-none');
        });
    }
    
    render() {
        return (
            <div className="autocomp-input-text">
                <span>{this.props.fieldName}</span><br/>
                <input type="text" placeholder={this.props.fieldName} id={this.props.id}></input>
                <div className="auto-complete">
                    {
                        this.props.data
                    }
                </div>
            </div>
        )
    }
}

export class  CustomMultiSelection extends React.Component{
    constructor(props){
        super(props);
    }
    
    componentDidMount(){
        const props = this.props;
        $('.auto-complete').addClass('display-none');
        var _that = this;
        $('#'+this.props.id).focus(function() {
            $('.auto-complete').addClass('display-none');
            $('#'+_that.props.id+' + .auto-complete').removeClass('display-none');
        });
    }

    closeDropdown = () => {
        $('.auto-complete').addClass('display-none');
    }
    
    render() {
        return (
            <div className="autocomp-input-text">
                <span>{this.props.fieldName}</span><br/>
                <input type="text" placeholder={this.props.fieldName} id={this.props.id}></input>
                <div className="auto-complete">
                    <div className="close-auto-complete">
                        <i class="fas fa-times" onClick={() => this.closeDropdown()}></i>
                    </div>
                    {
                        this.props.data
                    }
                </div>
            </div>
        )
    }
}

export class  CustomDropdown extends React.Component{
    constructor(props){
        super(props);
    }
    
    componentDidMount(){
        const props = this.props;
    }
    
    render() {
        return (
            <div className={"select-box " + (this.props.errorText ? "error" : "")}>
                <span>{this.props.fieldName} {this.props.Required ? '*':''}</span><br/>
                <select id={this.props.id}>
                    <option value="1" selected="selected" disabled="disabled">{this.props.optName}</option>
                    {
                        this.props.data
                    }
                </select><br/>
                <span>{this.props.errorText}</span>
            </div>
        )
    }
}


export class  CustomDate extends React.Component{
    constructor(props){
        super(props);
        
    }
    
    componentDidMount(){
        const props = this.props;
        
        if(props.value){
            var now = new Date(props.value);
            var day = ("0" + now.getDate()).slice(-2);
            var month = ("0" + (now.getMonth() + 1)).slice(-2);
            var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
            $('#'+this.props.id).val(today);
        }
    }
    
    render() {
        return (
            <div className="date-box">
                <span>{this.props.fieldName}</span><br/>
                <input type="date" id={this.props.id}></input>
            </div>
        )
    }
}

export class  CustomTextArea extends React.Component{
    constructor(props){
        super(props);
    }
    
    componentDidMount(){
        const props = this.props;
        if(props.value){
            $('#'+props.id).html(props.value);
        }
    }
    
    render() {
        return (
            <div className="input-text">
                <span>{this.props.fieldName}</span><br/>
                <textarea id={this.props.id}>
                
                </textarea>
            </div>
        )
    }
}

export class Table extends React.Component {
    constructor(props){
        super(props);
    }
    
    componentDidMount(){
        const props = this.props;
    }

    render() {
        return (
            <div>
                <h3 className="table-heading">{this.props.tableHeading}</h3>
                <table className="data-table">
                    <tr>
                        <th>SI#</th>
                        <th>Dept.Name</th>
                        <th>Total Task Received</th>
                        <th>Task Completed</th>
                        <th>Due Date</th>
                        <th>Task Completed within 3 days</th>
                        <th>Task Completed after 3 days</th>
                        <th>Task not Completed</th>
                        <th>Task not Accepted</th>
                        <th>Total percentage</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>IT</td>
                        <td>10</td>
                        <td>9</td>
                        <td>8</td>
                        <td>1</td>
                        <td>IT</td>
                        <td>10</td>
                        <td>9</td>
                        <td>8</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>IT</td>
                        <td>10</td>
                        <td>9</td>
                        <td>8</td>
                        <td>1</td>
                        <td>IT</td>
                        <td>10</td>
                        <td>9</td>
                        <td>8</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>IT</td>
                        <td>10</td>
                        <td>9</td>
                        <td>8</td>
                        <td>1</td>
                        <td>IT</td>
                        <td>10</td>
                        <td>9</td>
                        <td>8</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>IT</td>
                        <td>10</td>
                        <td>9</td>
                        <td>8</td>
                        <td>1</td>
                        <td>IT</td>
                        <td>10</td>
                        <td>9</td>
                        <td>8</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>IT</td>
                        <td>10</td>
                        <td>9</td>
                        <td>8</td>
                        <td>1</td>
                        <td>IT</td>
                        <td>10</td>
                        <td>9</td>
                        <td>8</td>
                    </tr>
                </table>
            </div>
        )
    }
}
