import React, { Component } from 'react';
import '../styles/style.css';

class Loader extends Component {
    constructor(props, context){
        super(props, context)
        this.state = {
            loadState : ''
        }

    }

    componentDidMount(){
        
    }

    render() {

        return (
            <div>
                {
                    this.props.isLoad ? 
                        <div className="loader">
                            <i className="fas fa-sync"></i>
                        </div>
                    : ''
                }
                
            </div>
        )
    }
}

export default Loader;
