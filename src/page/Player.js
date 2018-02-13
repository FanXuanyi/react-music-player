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
import Pubsub from 'pubsub-js';

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            duration: 0,//音频总时间
            barColor: '#2f9842',//进度条颜色
            volume: 0,//音量
            isPlay: true,//播放状态
            leftTime: 0//剩余时间
        };
    }

    componentDidMount() {
        // 时间更新
        $('#player').bind($.jPlayer.event.timeupdate, (e) => {
            this.setState({
                progress: e.jPlayer.status.currentPercentAbsolute,
                duration: e.jPlayer.status.duration,
                volume: e.jPlayer.options.volume * 100,//音量是一个0到1的值
                leftTime: this.formatTime(e.jPlayer.status.duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100))
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

    // 播放/暂停
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

    // 播放上一首
    playPrev() {
        Pubsub.publish('PLAY_PREV');
    }

    // 播放下一首
    playNext() {
        Pubsub.publish('PLAY_NEXT');
    }

    // 时间格式化
    formatTime(time) {
        time = Math.floor(time);
        let miniutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        return `${miniutes}:${seconds}`;
    }

    // 切换播放模式
    changeMode() {
        Pubsub.publish('CHANGE_MODE');
    }

    render() {
        return (
            <div className="player-page">
                <h1 className="player-caption">
                    <Link to='/music-list'>我的私人音乐坊&nbsp;&gt;</Link>
                </h1>
                <div className="player-info">
                    {/*歌曲信息*/}
                    <h2 className="music-title">{this.props.currentMusicItem.title}</h2>
                    <h3 className="music-artist">{this.props.currentMusicItem.artist}</h3>
                    <div>
                        {/*播放剩余时间*/}
                        <div className="left-time">-{this.state.leftTime}</div>
                        <div className="volume-controller">
                            <i className="fa fa-fw fa-volume-up"></i>
                            {/*音量进度条*/}
                            <div className="volume-wrapper">
                                <Progress progress={this.state.volume} barColor="#aaa" onProgressChange={this.changeVolumeHandler.bind(this)}/>
                            </div>
                        </div>
                    </div>
                    {/*播放进度条*/}
                    <div className="play-progress">
                        <Progress {...this.state} onProgressChange={this.progressChangeHandler.bind(this)}/>
                    </div>
                    <div className="play-controller">
                        {/*播放按钮：开始/暂停、上/下一首*/}
                        <span className="play-button">
                            <i className="fa fa-fw fa-2x fa-chevron-left" onClick={this.playPrev.bind(this)}></i>
                            <i className={`fa fa-fw fa-2x ${this.state.isPlay ? 'fa-pause' : 'fa-play'}`} onClick={this.play.bind(this)}></i>
                            <i className="fa fa-fw fa-2x fa-chevron-right" onClick={this.playNext.bind(this)}></i>
                        </span>
                        {/*播放模式：循环、单曲、随机*/}
                        <span className="play-mode">
                            <i className={`fa fa-fw fa-2x fa-${this.props.playMode}`} onClick={this.changeMode.bind(this)}></i>
                        </span>
                    </div>
                </div>
                {/*歌曲封面*/}
                <div className="music-pic">
                    <img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title}/>
                </div>
            </div>
        );
    }
}

export default Player;