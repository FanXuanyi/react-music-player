/**
 * Created by FXY on 2018/2/10.
 */
import React, { Component } from 'react';
import $ from 'jquery';
import 'jplayer';
import './Player.css';
import Progress from "../components/Progress";
import 'font-awesome/css/font-awesome.css';

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
        // 时间更新
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
                <h1 className="player-caption">我的私人音乐坊&nbsp;&gt;</h1>
                <div className="player-info">
                    <h2 className="music-title">歌曲名称</h2>
                    <h3 className="music-artist">歌手</h3>
                    <div>
                        <div className="left-time">-2:00</div>
                        <div className="volume-controller">
                            <i className="fa fa-fw fa-volume-up"></i>
                            <div className="volume-wrapper">音量控制部分</div>
                        </div>
                    </div>
                    <div className="play-progress">
                        <div id="player"></div>
                        <Progress {...this.state} onProgressChange={this.progressChangeHandler.bind(this)}/>
                    </div>
                    <div className="play-controller">
                        <span className="play-button">
                            <i className="fa fa-fw fa-2x fa-chevron-left"></i>
                            <i className="fa fa-fw fa-2x fa-play"></i>
                            <i className="fa fa-fw fa-2x fa-chevron-right"></i>
                        </span>
                        <span className="play-mode">
                            <i className="fa fa-fw fa-2x fa-refresh"></i>
                        </span>
                    </div>
                </div>
                <div className="music-pic">
                    <img src="http://placehold.it/180x180" alt="歌曲图片"/>
                </div>
            </div>
        );
    }
}

export default Player;