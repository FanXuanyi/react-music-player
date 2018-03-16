/**
 * Created by FXY on 2018/3/15.
 */
import React, { Component } from 'react';
import './ControllerUnit.css';

class ControllerUnit extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        // 如果点击的是当前正在选中态的按钮，则翻转图片，否则将对应的图片居中
        if (this.props.imgArrangeArr.isCenter) {
            this.props.inverse();
        } else {
            this.props.center();
        }
        e.preventDefault();
        e.stopPropagation();
    }

    render() {
        let controllerUnitClassName = "controller-unit";

        // 如果对应的是居中的图片，显示控制按钮的居中态
        if (this.props.imgArrangeArr.isCenter) {
            controllerUnitClassName += " is-center";
        }

        // 如果同时对应的是翻转图片，显示控制按钮的翻转态
        if (this.props.imgArrangeArr.isInverse) {
            controllerUnitClassName += " is-inverse";
        }

        return (
            <span className={controllerUnitClassName} onClick={this.handleClick}></span>
        );
    }
}

export default ControllerUnit;