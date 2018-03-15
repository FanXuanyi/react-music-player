/**
 * Created by FXY on 2018/3/13.
 */
import React, { Component } from 'react';
import './ImgFigure.css';

class ImgFigure extends Component {
    render() {
        let imagesData = this.props.imagesData;
        // console.log(imagesData.imageURL);

        let styleObj = {};
        // 如果props属性中指定了这张图片的位置，则使用
        if (this.props.arrange) {
            styleObj = this.props.arrange.pos;
        }

        return (
            <figure className="img-figure" style={styleObj}>
                <img src={imagesData.imageURL} alt={imagesData.title}/>
                <figcaption>
                    <h2 className="img-title">{imagesData.title}</h2>
                </figcaption>
            </figure>
        );
    }
}

export default ImgFigure;