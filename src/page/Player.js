/**
 * Created by FXY on 2018/2/10.
 */
import React, { Component } from 'react';
import $ from 'jquery';
import 'jplayer';
import './Player.css';
import Progress from "../components/Progress";
import 'font-awesome/css/font-awesome.css';
import { Link } from 'react-router-dom';

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            duration: 0,//音频总时间
            barColor: '#2f9842',//进度条颜色
            volume: 0,//音量
            isPlay: true//播放状态
        };
    }

    componentDidMount() {
        // 时间更新
        $('#player').bind($.jPlayer.event.timeupdate, (e) => {
            this.setState({
                progress: e.jPlayer.status.currentPercentAbsolute,
                duration: e.jPlayer.status.duration,
                volume: e.jPlayer.options.volume * 100//音量是一个0到1的值
            });
        });
    }

    componentWillUnMount() {
        $('#player').unbind($.jPlayer.event.timeupdate);
    }

    progressChangeHandler(progress) {
        // console.log('from root widget', progress);
        //做一个判断是为了解决音乐暂停时，点击进度条，音乐会跳转到对应时间但按isPlay状态没有改变的bug
        $('#player').jPlayer(this.state.isPlay ? 'play' : 'pause', this.state.duration * progress);
    }

    changeVolumeHandler(progress) {
        $('#player').jPlayer('volume', progress);
    }

    play() {
        if (this.state.isPlay) {
            $('#player').jPlayer('pause');
        } else {
            $('#player').jPlayer('play');
        }
        this.setState({
            isPlay: !this.state.isPlay
        });
    }

    render() {
        return (
            <div className="player-page">
                <h1 className="player-caption">
                    <Link to='/music-list'>我的私人音乐坊&nbsp;&gt;</Link>
                </h1>
                <div className="player-info">
                    <h2 className="music-title">{this.props.currentMusicItem.title}</h2>
                    <h3 className="music-artist">{this.props.currentMusicItem.artist}</h3>
                    <div>
                        <div className="left-time">-2:00</div>
                        <div className="volume-controller">
                            <i className="fa fa-fw fa-volume-up"></i>
                            <div className="volume-wrapper">
                                <Progress progress={this.state.volume} barColor="#aaa" onProgressChange={this.changeVolumeHandler.bind(this)}/>
                            </div>
                        </div>
                    </div>
                    <div className="play-progress">
                        <div id="player"></div>
                        <Progress {...this.state} onProgressChange={this.progressChangeHandler.bind(this)}/>
                    </div>
                    <div className="play-controller">
                        <span className="play-button">
                            <i className="fa fa-fw fa-2x fa-chevron-left"></i>
                            <i className={`fa fa-fw fa-2x ${this.state.isPlay ? 'fa-pause' : 'fa-play'}`} onClick={this.play.bind(this)}></i>
                            <i className="fa fa-fw fa-2x fa-chevron-right"></i>
                        </span>
                        <span className="play-mode">
                            <i className="fa fa-fw fa-2x fa-refresh"></i>
                        </span>
                    </div>
                </div>
                <div className="music-pic">
                    <img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title}/>
                </div>
            </div>
        );
    }
}

export default Player;