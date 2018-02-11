/**
 * Created by FXY on 2018/2/11.
 */
import React, { Component } from 'react';
import './MusicListItem.css';

class MusicListItem extends Component {
    render() {
        let musicItem = this.props.musicItem;
        return (
            <li className={`components-musicListItem ${this.props.focus ? 'focus' : ''}`}>
                <p><strong>{musicItem.title}</strong> - {musicItem.artist}</p>
                <p className="delete"></p>
            </li>
        );
    }
}

export default MusicListItem;