/**
 * Created by FXY on 2018/2/11.
 */
import React, { Component } from 'react';
import MusicListItem from '../components/MusicListItem';
import './MusicList.css';

class MusicList extends Component {
    render() {
        let listElement = this.props.musicList.map((item) => {
            return (
                <MusicListItem focus={item === this.props.currentMusicItem} key={item.id} musicItem={item}>
                    {item.title}
                </MusicListItem>
            );
        });
        return (
            <div className="musicList-page">
                <h1 className="musicList-caption">我的音乐列表</h1>
                <ul>
                    {listElement}
                </ul>
            </div>
        );
    }
}

export default MusicList;