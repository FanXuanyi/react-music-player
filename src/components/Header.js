/**
 * Created by FXY on 2018/2/9.
 */
import React, { Component } from 'react';
import './Header.css';
import logo from './../images/logo.png';

class Header extends Component {
    render() {
        return (
            <div className="components-header">
                <img src={logo} className="logo" alt=""/>
                <h1 className="header-caption">React Music Player</h1>
            </div>
        );
    }
}

export default Header;