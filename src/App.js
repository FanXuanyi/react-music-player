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
            progress: 0,//初始状态
            duration: 0,//音频总时间
            barColor: '#2f9842'//进度条颜色
        };
    }

    componentDidMount() {
        $('#player').jPlayer({
            ready: function () {
                $(this).jPlayer('setMedia', {
                    mp3: 'http://m10.music.126.net/20180210172053/87f12be48a03667d4a84d98cc72606fe/ymusic/2d15/d9fd/57cd/6679396a63ff496ecef0453b25612dfa.mp3'
                }).jPlayer('play');
            },
            supplied: 'mp3',
            wmode: 'window'
        });
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
      <div>
        <Header/>
          <div id="player"></div>
        <Progress {...this.state} onProgressChange={this.progressChangeHandler.bind(this)}/>
      </div>
    );
  }
}

export default App;
