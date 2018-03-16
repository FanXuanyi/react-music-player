/**
 * Created by FXY on 2018/3/13.
 */
import React, { Component } from 'react';
import './ImgFigure.css';

class ImgFigure extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    // imgFigure的点击处理函数
    handleClick(e) {
        if (this.props.imgArrangeArr.isCenter) {
            this.props.inverse();
        } else {
            this.props.center();
        }

        e.stopPropagation();
        e.preventDefault();
    }

    render() {
        let imagesData = this.props.imagesData;
        // console.log(imagesData.imageURL);

        let styleObj = {};
        // 如果props属性中指定了这张图片的位置，则使用
        if (this.props.imgArrangeArr) {
            // styleObj = this.props.imgArrangeArr.pos;
            styleObj=Object.assign(styleObj, this.props.imgArrangeArr.pos);
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

        if (this.props.imgArrangeArr.isCenter) {
            styleObj.zIndex = 11;
        }

        let imgFigureClassName = "img-figure";
        imgFigureClassName += this.props.imgArrangeArr.isInverse ? ' is-inverse' : '';

        return (
            <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
                <img src={imagesData.imageURL} alt={imagesData.title}/>
                <figcaption>
                    <h2 className="img-title">{imagesData.title}</h2>
                </figcaption>
                <div className="img-back" onClick={this.handleClick}>
                    <p>
                        {this.props.imagesData.desc}
                    </p>
                </div>
            </figure>
        );
    }
}

export default ImgFigure;