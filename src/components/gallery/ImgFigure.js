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
        if (this.props.imgArrangeArr) {
            styleObj = this.props.imgArrangeArr.pos;
        }

        let rotate = this.props.imgArrangeArr.rotate;
        // console.log(this.props.imgArrangeArr.rotate);
        // 如果图片的旋转角度有值并且不为0，添加旋转角度
        if (this.props.imgArrangeArr.rotate) {
            let prefix = ['-moz-', '-ms-', '-webkit-', ''];
            prefix.forEach(function (value) {
                // console.log(value+'transform');
                // console.log(rotate);
                styleObj[value + 'transform'] = 'rotate(' + rotate + 'deg)';
            });
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