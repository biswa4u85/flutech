import React, { Component } from 'react';
import '../styles/sidebar.css';
import { Link } from 'react-router-dom';


class SideMenu extends Component {

    constructor(){
        super();
        this.menu = [
            {link:'/dashboard',name:'Dashboard'},
            {link:'/addDepartment',name:'Department'},
            {link:'/departments',name:'Departments List'},
            {link:'/addEmployee',name:'Employee'},
            {link:'/Employees',name:'Employees List'},
            {link:'/sites',name:'Sites List'},
            {link:'/contractors',name:'Contractor List'},
            {link:'/suppliers',name:'Suppliers List'},
            {link:'/addTask',name:'Tasks'},
            {link:'/assignedTask',name:'Assign Tasks'},
            {link:'/myTask',name:'My Tasks'},
            {link:'/history',name:'History'},
            {link:'/intent',name:'Create Intent'},
            {link:'/listIntent',name:'Intent List'},
            {link:'/mailer',name:'Send Mail List'}
        ]

        this.signOut = this.signOut.bind(this);
        this.delete_cookie = this.delete_cookie.bind(this);
    }

    signOut() {
        this.delete_cookie('userName');
        this.delete_cookie('userId');
        this.delete_cookie('coords');
        window.location.href = '/';
    }

    delete_cookie(name) {
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    render() {
      return (
        <div className="side-menu">
            <ul className="menu-list">
            { 
                this.menu.map((list,i)=>{
                    return (
                        <li key={i}>
                            <Link to={list.link}>
                                <span className="menu-name">{list.name}</span>
                            </Link>
                        </li>
                    )
                })
            }
                <li onClick={this.signOut}>
                    <span className="menu-name">Sign out</span>
                </li>
            </ul>
        </div>
      );
    }
  }
  
  export default SideMenu;