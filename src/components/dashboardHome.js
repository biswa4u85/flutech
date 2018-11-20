import React, { Component } from 'react';
import '../styles/style.css';
import Header from './header';
import SideMenu from './sideMenu';
import MenuTabs from './addMenuTabs';
import {Table} from './inputComponents';

class DashboardHome extends Component {

    componentDidMount() {

    }
    
    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <SideMenu />
                    <div className="data-container">
                        <h3 className="main-menu-name">Home / Dashboard</h3>
                        <h2 className="welcome-text">Welcome to Flutech Employee Portal</h2>
                        <hr />
                        <MenuTabs />
                        <br />
                        <Table tableHeading="Department Wise" />
                        <Table tableHeading="Assigned To" />
                    </div>
                </div>
            </div>
        )
    }
}

export default DashboardHome;