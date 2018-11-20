import React, { Component } from 'react';
import '../styles/style.css';
import SideMenu from './sideMenu';
import {Table} from './inputComponents';

class AddDept extends Component {
    render() {
        return (
            <div className="container">
                <SideMenu />
                <div className="data-container">
                    <h3 className="main-menu-name">Home / Task History</h3>
                    <h2 className="welcome-text">Task History</h2>
                    <hr />
                    <br />
                    <Table />
                </div>
            </div>
        )
    }
}

export default AddDept;