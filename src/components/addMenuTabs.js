import React, { Component } from 'react';
import '../styles/menuTabs.css';
import { Link } from 'react-router-dom';


class AddMenuTabs extends Component {

    constructor(){
        super();
        this.menuTabs = [
            {link:'/addDepartment',name:'Add Department',icon:'fas fa-plus-circle'},
            {link:'/addEmployee',name:'Add Employee',icon:'fas fa-user-plus'},
            {link:'/addSite',name:'Add Site',icon:'fas fa-map-marker-alt'},
            {link:'/addContractor',name:'Add Contractor',icon:'fas fa-user'},
            {link:'/addSupplier',name:'Add Supplier',icon:'fas fa-user-circle'},
            {link:'/addTask',name:'Assign Tssk',icon:'fas fa-clipboard'},
            {link:'/myTask',name:'My Task',icon:'fas fa-clipboard-check'},
            {link:'/history',name:'Task History',icon:'fas fa-tasks'}
        ]
    }

    render() {
      return (
        <div className="menu-tabs">
            { 
                this.menuTabs.map((list,index)=>{
                    return (
                        <div className="menu" key={index}>
                            <i className={list.icon}></i><br/>
                            <Link to={list.link}>
                                <span className="menu-name">{list.name}</span>
                            </Link>
                        </div>
                    )
                })
            }
        </div>
      );
    }
  }
  
  export default AddMenuTabs;