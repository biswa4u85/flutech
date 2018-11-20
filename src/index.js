import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './components/login';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Dashboard from './components/dashboardHome';
import AddDept from './components/addDept';
import AddEmployee from './components/addEmployee';
import AddSite from './components/addSite';
import AddTask from './components/addTask';
import AddContractor from './components/addContractor';
import AddSupplier from './components/addSupplier';
import AssignedTask from './components/assignTask';
import MyTask from './components/myTask';
import history from './components/history';
import Intent from './components/createIntet';
import ViewIntent from './components/viewIntent';
import ListIntent from './components/listIntent';
import Mailer from './components/mailer';
import Review from './components/reviews';
import Reminder from './components/reminder';
import EmployeesList from './components/employeeList';
import DepartmentsList from './components/departmentList';
import SitesList from './components/siteList';
import ContractorsList from './components/contractorsList';
import SuppliersList from './components/suppliersList';


ReactDOM.render(
    <Provider>
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route exact path="/dashboard" component={Dashboard}/>
          <Route exact path="/addDepartment" component={AddDept}/>
          <Route exact path="/departments" component={DepartmentsList}/>
          <Route exact path="/addEmployee" component={AddEmployee}/>
          <Route exact path="/employees" component={EmployeesList}/>
          <Route exact path="/addSite" component={AddSite}/>
          <Route exact path="/sites" component={SitesList}/>
          <Route exact path="/addTask/" component={AddTask}/>
          <Route exact path="/addTask/:id" component={AddTask}/>
          <Route exact path="/addContractor" component={AddContractor}/>
          <Route exact path="/contractors" component={ContractorsList}/>
          <Route exact path="/addSupplier" component={AddSupplier}/>
          <Route exact path="/suppliers" component={SuppliersList}/>
          <Route exact path="/assignedTask" component={AssignedTask}/>
          <Route exact path="/myTask" component={MyTask}/>
          <Route exact path="/history" component={history}/>
          <Route exact path="/intent" component={Intent}/>
          <Route exact path="/viewIntent/:id" component={ViewIntent}/>
          <Route exact path="/listIntent" component={ListIntent}/>
          <Route exact path="/mailer" component={Mailer}/>
          <Route exact path="/review" component={Review}/>
          <Route exact path="/reminder" component={Reminder}/>
        </div>
      </Router>
    </Provider>, 
    document.getElementById('root')
);
registerServiceWorker();
