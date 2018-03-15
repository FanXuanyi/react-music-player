/**
 * Created by FXY on 2018/3/13.
 */
import React, { Component } from 'react';
import ImgFigure from "../components/gallery/ImgFigure";
import './Picture.css';
import ReactDOM from 'react-dom';

// 获取区间内的一个随机值
function getRangeRandom(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

// 获取0-30°之间的一个任意正负值
function get30DegRandom() {
    return (Math.random() > 0.5 ? '' : '-') + Math.ceil((Math.random()) * 30);
}

class Picture extends Component {
    constructor(props) {
        super(props);
        this.constant = { // 用来存储排布可取的范围
            centerPos: {
                left: 0,
                right: 0
            },
            hPosRange: { // 水平方向的取值范围
                leftSecX: [0,0],
                rightSecX: [0,0],
                y: [0,0]
            },
            vPosRange: { // 垂直方向的取值范围
                x: [0,0],
                topY: [0,0]
            }
        };
         this.state = {
             imgArrangeArr: [
                 // {
                 //     pos: {
                 //         left: '0',
                 //         top: '0'
                 //     },
                 //     rotate: 0, // 旋转角度
                 //     isInverse: false, // 图片正反面
                 //     isCenter: false // 图片是否居中
                 // }
             ]
         };
    }

    /*
     * 翻转图片
     * @param index 输入当前被执行inverse操作的图片对应的图片信息数组的index数组
     * @return {Function} 这是一个闭包函数，其内return一个真正待执行的函数
     */
    inverse(index) {
        return function() {
            let imgArrangeArr = this.state.imgArrangeArr;
            imgArrangeArr[index].isInverse = !imgArrangeArr[index].isInverse;

            this.setState({
                imgArrangeArr: imgArrangeArr
            });
        }.bind(this);
    }

    /*
     * 重新布局所有图片
     * @param centerIndex 指定居中排布哪个图片
     */
    rearrange(centerIndex) {
        let imgArrangeArr = this.state.imgArrangeArr,
            constant = this.constant,
            centerPos = constant.centerPos,
            hPosRange = constant.hPosRange,
            vPosRange = constant.vPosRange,
            hPosRangeLeftSecX = hPosRange.leftSecX,
            hPosRangeRightSecX = hPosRange.rightSecX,
            hPosRangeY = hPosRange.y,
            vPosRangeTopY = vPosRange.topY,
            vPosRangeX = vPosRange.x;

        let imgArrangeTopArr = [], // 存储布局在上侧的图片信息
            topImgNum = Math.floor(Math.random() * 2), // 取一个或者不取
            topImgSpliceIndex; // 用来标记上侧区域图片是从数组中哪个位置拿出来的

        let imgArrangeCenterArr = imgArrangeArr.splice(centerIndex, 1); // 用来存储居中图片信息
        // console.log(imgArrangeArr);

        // 居中centerIndex的图片
        imgArrangeCenterArr[0] = {
            pos: centerPos,
            rotate: 0,
            isCenter: true
        };
        // console.log(centerPos);
        // console.log(imgArrangeCenterArr);

        // 取出要布局上侧的图片状态信息
        topImgSpliceIndex = Math.floor(Math.random() * (imgArrangeArr.length - topImgNum));
        imgArrangeTopArr = imgArrangeArr.splice(topImgSpliceIndex, topImgNum);

        // 布局位于上侧的图片
        imgArrangeTopArr.forEach(function (value, index) {
            imgArrangeTopArr[index] = {
                pos: {
                    top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                    left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
                },
                rotate: get30DegRandom(),
                isCenter: false
            };
        });

        // 布局左右两侧的图片
        for (let i = 0; i < imgArrangeArr.length; i++) {
            let hPosRangeLORX = null;

            // 前半部分布局左边，右半部分布局优点
            if (i < (imgArrangeArr.length / 2)) {
                hPosRangeLORX = hPosRangeLeftSecX;
            } else {
                hPosRangeLORX = hPosRangeRightSecX;
            }

            imgArrangeArr[i] = {
                pos: {
                    top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
                    left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
                },
                rotate: get30DegRandom(),
                isCenter: false
            };
        }

        if (imgArrangeTopArr && imgArrangeTopArr[0]) {
            imgArrangeArr.splice(topImgSpliceIndex, 0, imgArrangeTopArr[0]);
        }
        // console.log(imgArrangeArr);

        imgArrangeArr.splice(centerIndex+1, 0, imgArrangeCenterArr[0]); // 图片id是从1开始的
        // console.log(imgArrangeArr);

        this.setState({
            imgArrangeArr: imgArrangeArr
        });
        // console.log(imgArrangeArr);
    }

    /*
     * 利用rearrange函数，居中对应index的图片
     * @param index 需要被居中的图片对应的图片信息数组的index数组
     * @return {Function}
     */
    center(index) {
        return function () {
            this.rearrange(index-1);
        }.bind(this);
    }

    // 组件加载以后，为每张图片计算其位置的范围
    componentDidMount() {
        // scrollWidth: 对象实际内容的宽度，不包含边线宽度，会随对象中内容超过可视区而变大。
        // clientWidth: 对象内容的可视区的宽度，不包含滚动条等边线，会随对象显示大小的变化而改变。
        // offsetWidth: 对象整体的实际宽度，包含滚动条等边线，会随对象显示大小的变化而改变。

        // 舞台的大小
        let stageDOM = ReactDOM.findDOMNode(this.refs.stage),
            stageWidth = stageDOM.scrollWidth,
            stageHeight = stageDOM.scrollHeight,
            halfStageWidth = Math.ceil(stageWidth / 2),
            halfStageHeight = Math.ceil(stageHeight / 2);

        // imageFigure的大小
        let imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure1),
            imgWidth = imgFigureDOM.scrollWidth,
            imgHeight = imgFigureDOM.scrollHeight,
            halfImgWidth = Math.ceil(imgWidth / 2),
            halfImgHeight = Math.ceil(imgHeight / 2);

        // 计算中心图片的位置点
        this.constant.centerPos = {
            left: halfStageWidth - halfImgWidth,
            top: halfStageHeight - halfImgHeight
        };

        // 计算左侧和右侧区域图片排布位置的取值范围
        this.constant.hPosRange.leftSecX[0] = 0 - halfImgWidth; // 左侧区域x的下限
        this.constant.hPosRange.leftSecX[1] = halfStageWidth - halfImgWidth * 3; // 左侧区域x的上限

        this.constant.hPosRange.rightSecX[0] = halfStageWidth + halfImgWidth; // 右侧区域x的下限
        this.constant.hPosRange.rightSecX[1] = stageWidth - halfImgWidth; // 右侧区域x的上限

        this.constant.hPosRange.y[0] = 0 - halfImgHeight + 100; // y的最小值
        this.constant.hPosRange.y[1] = stageHeight - halfImgHeight * 3 + 100; // y的最大值

        // 计算上侧区域图片排布位置的取值范围
        this.constant.vPosRange.topY[0] = 0 - halfImgHeight; // 上侧区域y的最小值
        this.constant.vPosRange.topY[1] = halfStageHeight - halfImgHeight * 3; // 上侧区域y的最大值

        this.constant.vPosRange.x[0] = halfStageWidth - imgWidth; // 上侧区域x轴取的最小值
        this.constant.vPosRange.x[1] = halfStageWidth; // 上侧区域x轴取的最大值

        this.rearrange(0);
    }

    render() {
        let imgFigures = this.props.imagesData.map(item => {
            if (!this.state.imgArrangeArr[item.id]) {
                this.state.imgArrangeArr[item.id] = {
                    pos: {
                        left: 0,
                        top: 0
                    },
                    rotate: 0, // 居中图片不需要旋转
                    isInverse: false,
                    isCenter: false
                };
            }
            return <ImgFigure key={item.id} ref={'imgFigure' + item.id}
                              imagesData={item} imgArrangeArr={this.state.imgArrangeArr[item.id]}
                              inverse={this.inverse(item.id)} center={this.center(item.id).bind(this)}/>
        });

        return (
            <div className="stage" ref="stage">
                <div className="img-sec">
                    {imgFigures}
                </div>
                {/*<nav>{controllerUnits}</nav>*/}
            </div>
        );
    }
}

export default Picture;