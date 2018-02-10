/**
 * Created by FXY on 2018/2/10.
 */
import React, { Component } from 'react';
import $ from 'jquery';
import 'jplayer';
import './Player.css';
import Progress from "../components/Progress";

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,//初始状态
            duration: 0,//音频总时间
            barColor: '#2f9842'//进度条颜色
        };
    }

    componentDidMount() {
        $('#player').bind($.jPlayer.event.timeupdate, (e) => {
            this.setState({
                progress: e.jPlayer.status.currentPercentAbsolute,
                duration: e.jPlayer.status.duration
            });
        });
    }

    componentWillUnMount() {
        $('#player').unbind($.jPlayer.event.timeupdate);
    }

    progressChangeHandler(progress) {
        // console.log('from root widget', progress);
        $('#player').jPlayer('play', this.state.duration * progress);
    }

    render() {
        return (
            <div className="player-page">
                <h1 className="caption">我的私人音乐坊&gt;</h1>
                <div>
                    <div>
                        <h2 className="music-title">歌曲名称</h2>
                        <h3 className="music-artist">歌手</h3>
                        <div>
                            <div className="left-time"></div>
                            <div className="volume-container">
                                <i></i>
                                <div className="volume-wrapper">音量控制部分</div>
                            </div>
                        </div>
                        <div style={{height: 10, lineHeight: '10px'}}>播放进度</div>
                        <div className="mt35">
                            <div>
                                <i className="icon"></i>
                                <i className="icon"></i>
                                <i className="icon ml20"></i>
                            </div>
                            <div>
                                <i className="icon"></i>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img src="" alt=""/>
                    </div>
                </div>
                <div id="player"></div>
                <Progress {...this.state} onProgressChange={this.progressChangeHandler.bind(this)}/>
            </div>
        );
    }
}

export default Player;