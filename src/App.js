import React, { Component } from 'react';
import Header from "./components/Header";
import $ from 'jquery';
import 'jplayer';
import Player from "./page/Player";
import { MUSIC_INFO } from './config/MusicInfo';
import MusicList from './page/MusicList';
import { Switch, Route, Router } from 'react-router-dom';
import createBrowserHistory from "history/createBrowserHistory";
import Pubsub from 'pubsub-js';
import { IMAGE_INFO } from './config/ImageInfo';
import Picture from './page/Picture';
import './App.css';

const history = createBrowserHistory();

let modeList = [
    'refresh',//表示循环
    'arrows-h',//表示单曲
    'random'//表示随机
];//播放模式

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentMusicItem: MUSIC_INFO[0],
            musicList: MUSIC_INFO,
            playMode: 'refresh',//当前播放模式
            imagesData: IMAGE_INFO
        }
    }

    // 将图片名信息转成图片URL路径信息
    getImageURL(imageDataArr) {
        for (let i = 0; i < imageDataArr.length; i++) {
            let singleImageData = imageDataArr[i];
            // console.log('./images/' + singleImageData.fileName);
            singleImageData['imageURL'] = require('./images/' + singleImageData.fileName);
            // console.log(singleImageData);
            imageDataArr[i] = singleImageData;
        }
        return imageDataArr;
    }

    // 播放音乐
    playMusic(musicItem) {
        $('#player').jPlayer('setMedia', {
            mp3: musicItem.file
        }).jPlayer('play');
        this.setState({
            currentMusicItem: musicItem
        });
    }

    // 播放上/下一首
    playSwitch(type = 'next') {
        let index = this.findMusicIndex(this.state.currentMusicItem);
        let newIndex = null;
        let musicListLength = this.state.musicList.length;
        if (type === 'next') {
            newIndex = (index + 1) % musicListLength;
        } else {
            newIndex = (index - 1 + musicListLength) % musicListLength;
        }
        this.playMusic(this.state.musicList[newIndex]);
    }

    // 寻找当前播放音乐在列表的位置
    findMusicIndex(musicItem) {
        return this.state.musicList.indexOf(musicItem);
    }

    // 当前音乐播放结束时判断播放模式
    playWhenEnd() {
        if (this.state.playMode === 'random') {
            let index = this.findMusicIndex(this.state.currentMusicItem);
            let randomIndex = index;
            while (randomIndex === index) {
                randomIndex = Math.floor(Math.random() * this.state.musicList.length);
            }
            this.playMusic(this.state.musicList[randomIndex]);
        } else {
            if (this.state.playMode === 'arrows-h') {
                this.playMusic(this.state.currentMusicItem);
            } else {
                this.playSwitch('next');
            }
        }
    }

    componentDidMount() {
        // 添加图片的URL
        this._isMounted = true;
        if (this._isMounted) {
            // this.state.imagesData = this.getImageURL(IMAGE_INFO);
            this.setState({
                imagesData: this.getImageURL(IMAGE_INFO)
            });
        }

        // 音乐播放初始化
        $('#player').jPlayer({
            // ready: function () {
            //     $(this).jPlayer('setMedia', {
            //         mp3: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3'
            //     }).jPlayer('play');
            // },
            supplied: 'mp3',
            wmode: 'window'
        });
        this.playMusic(this.state.currentMusicItem);
        $('#player').bind($.jPlayer.event.ended, (e) => {
            // this.playSwitch();
            this.playWhenEnd();
        });

        Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
            this.playMusic(musicItem);
        });

        Pubsub.subscribe('PLAY_PREV', (msg, musicItem) => {
            this.playSwitch('prev');
        });

        Pubsub.subscribe('PLAY_NEXT', (msg, musicItem) => {
            this.playSwitch('next');
        });

        Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
            this.setState({
                musicList: this.state.musicList.filter(item => {
                    return item !== musicItem;
                })
            });
        });

        Pubsub.subscribe('CHANGE_MODE', () => {
            let index = modeList.indexOf(this.state.playMode);
            index = (index + 1) % modeList.length;
            this.setState({
                playMode: modeList[index]
            });
        });
    }

    // 解绑
    componentWIllUnMount() {
        Pubsub.unsubscribe('PLAY_MUSIC');
        Pubsub.unsubscribe('PLAY_PREV');
        Pubsub.unsubscribe('PLAY_NEXT');
        Pubsub.unsubscribe('DELETE_MUSIC');
        Pubsub.unsubscribe('CHANGE_MODE');
        $('#player').unbind($.jPlayer.event.ended);
        this._isMounted = false;
    }

    render() {
        const Home = () => (
            <Player currentMusicItem={this.state.currentMusicItem} playMode={this.state.playMode}/>
        );

        const List = () => (
            <MusicList currentMusicItem={this.state.currentMusicItem} musicList={this.state.musicList}/>
        );

        const Pic = () => (
            <Picture imagesData={this.state.imagesData}/>
        );

        return (
            <div>
                <Header/>
                <div className="picture-container">
                    <Pic/>
                </div>
                <div className="music-container">
                    <div id="player"></div>
                    {/*<MusicList {...this.state}/>*/}
                    {/*<Player currentMusicItem={this.state.currentMusicItem}/>*/}
                    <Router history={history}>
                        <Switch>
                            {/*<Route exact path='/' render={() => <Player currentMusicItem={this.state.currentMusicItem}/>}></Route>*/}
                            {/*<Route path='/music-list' render={() => <MusicList {...this.state}/>}></Route>*/}
                            <Route exact path='/' component={Home}></Route>
                            <Route path='/music-list' component={List}></Route>
                        </Switch>
                    </Router>
                </div>
            </div>
        );
    }
}

export default App;
