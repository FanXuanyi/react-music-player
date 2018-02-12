import React, { Component } from 'react';
import './App.css';
import Header from "./components/Header";
import $ from 'jquery';
import 'jplayer';
import Player from "./page/Player";
import { MUSIC_INFO } from './config/MusicInfo';
import MusicList from './page/MusicList';
import { Switch, Route, Router } from 'react-router-dom';
import createBrowserHistory from "history/createBrowserHistory";

const history = createBrowserHistory();

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentMusicItem: MUSIC_INFO[0],
            musicList: MUSIC_INFO
        };
    }

    componentDidMount() {
        // 音乐播放
        $('#player').jPlayer({
            ready: function () {
                $(this).jPlayer('setMedia', {
                    mp3: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3'
                }).jPlayer('play');
            },
            supplied: 'mp3',
            wmode: 'window'
        });
    }

    render() {
        const Home = () => (
            <Player currentMusicItem={this.state.currentMusicItem}/>
        );

        const List = () => (
            <MusicList {...this.state}/>
        );

        return (
            <div>
                <Header/>
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
        );
    }
}

export default App;
