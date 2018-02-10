/**
 * Created by FXY on 2018/2/9.
 */
import React, { Component } from 'react';
import './Progress.css';

class Progress extends Component {

    render() {
        return (
            <div className="components-progress">
                <div className="progress" style={{width: `${this.props.progress}%`}}></div>
            </div>
        );
    }
}

export default Progress;