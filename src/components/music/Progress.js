/**
 * Created by FXY on 2018/2/9.
 */
import React, { Component } from 'react';
import './Progress.css';

class Progress extends Component {

    changeProgress(e) {
        let progressBar = this.refs.progressBar;//获取原生的DOM节点
        let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;//用户点击之后的进度值
        // console.log(progress);
        this.props.onProgressChange && this.props.onProgressChange(progress);
    }

    render() {
        let barStyle = {
            width: `${this.props.progress}%`,//ES6语法
            background: this.props.barColor
        };

        return (
            <div className="components-progress" ref="progressBar" onClick={this.changeProgress.bind(this)}>
                <div className="progress" style={barStyle}></div>
            </div>
        );
    }
}

export default Progress;