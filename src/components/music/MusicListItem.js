/**
 * Created by FXY on 2018/2/11.
 */
import React, { Component } from 'react';
import './MusicListItem.css';
import Pubsub from 'pubsub-js';

class MusicListItem extends Component {

    playMusic(musicItem) {
        Pubsub.publish('PLAY_MUSIC', musicItem);
    }

    deleteMusic(musicItem, e) {
        e.stopPropagation();//阻止事件冒泡
        Pubsub.publish('DELETE_MUSIC', musicItem);
    }

    render() {
        let musicItem = this.props.musicItem;
        return (
            <li onClick={this.playMusic.bind(this, musicItem)} className={`components-musicListItem ${this.props.focus ? 'focus' : ''}`}>
                <p><strong>{musicItem.title}</strong> - {musicItem.artist}</p>
                <p onClick={this.deleteMusic.bind(this, musicItem)} className="delete"></p>
            </li>
        );
    }
}

export default MusicListItem;