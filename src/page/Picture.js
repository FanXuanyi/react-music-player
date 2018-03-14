/**
 * Created by FXY on 2018/3/13.
 */
import React, { Component } from 'react';
import ImgFigure from "../components/gallery/ImgFigure";
import './Picture.css';

class Picture extends Component {
    render() {
        let imgFigures = this.props.imagesData.map(item => {
            return <ImgFigure key={item.fileName} imagesData={item}/>
        });

        return (
            <div className="stage">
                <section className="img-sec">
                    {imgFigures}
                </section>
                {/*<nav>{controllerUnits}</nav>*/}
            </div>
        );
    }
}

export default Picture;