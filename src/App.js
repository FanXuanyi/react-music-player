import React, { Component } from 'react';
import './App.css';
import Header from "./components/Header";
import Progress from './components/Progress';
import $ from 'jquery';
import 'jplayer';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            progress: '-'
        };
    }

    componentDidMount() {
        $('#player').jPlayer({
            ready: function () {
                $(this).jPlayer('setMedia', {
                    mp3: 'http://m10.music.126.net/20180210155250/a06a83cf3729a8c85a400baa5096c6c2/ymusic/2d15/d9fd/57cd/6679396a63ff496ecef0453b25612dfa.mp3'
                }).jPlayer('play');
            },
            supplied: 'mp3',
            wmode: 'window'
        });
        $('#player').bind($.jPlayer.event.timeupdate, (e) => {
            this.setState({
                progress: Math.round(e.jPlayer.status.currentTime)
            });
        });
    }

  render() {
    return (
      <div>
        <Header/>
          <div id="player"></div>
        <Progress progress="1"/>
      </div>
    );
  }
}

export default App;
