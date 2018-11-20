import React, { Component } from 'react';
import '../styles/style.css';

class ErrorBox extends Component {
    constructor(props, context){
        super(props, context)
        
        this.state = {
            activity : ''
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                {
                    this.props.activity === 'success' &&  
                        <div className="success-box">
                            Added successfully
                        </div>
                }
                {
                    this.props.activity === 'updated' &&  
                        <div className="success-box">
                            Updated successfully
                        </div>
                }
                {
                    this.props.activity === 'email-success' &&  
                        <div className="success-box">
                            Email sent successfully
                        </div>
                }
                {
                    this.props.activity === 'error' && 
                        <div className="error-box">
                            Please fill all the details
                        </div>
                }
                {
                    this.props.activity === 'emp-error' && 
                        <div className="error-box">
                            Please fill Employee ID, Emp Name, Department, Employee Type, HOD, Contact number
                        </div>
                }
                {
                    this.props.activity === 'Approved Intent' && 
                        <div className="success-box">
                            Intent Approved
                        </div>
                }
                {
                    this.props.activity === 'Rejected Intent' && 
                        <div className="error-box">
                            Intent Rejected
                        </div>
                }
                
            </div>
        )
    }
}

export default ErrorBox;