// src/components/Background.js
import React from 'react';
import './Background.css'; // Import a CSS file for styling if needed
import svg1 from '../assets/Ellipse 74.svg'; // Import your SVG images
import svg2 from '../assets/Ellipse 75.svg';
import svg3 from '../assets/Ellipse 76.svg';
import svg4 from '../assets/Footer-Powered.svg';
import svg6 from '../assets/LOGO.svg';
import top from '../assets/top-left.svg' ;
import botlef from '../assets/botem-left.svg' ;
import botrig from '../assets/bottom-right.svg' ;
import overlayImage from '../assets/Texture.png'; // Import your PNG overlay image

const Background = () => {
    // const imageBack = {
    //     "zIndex" : "0"
    // }
    return (
        <>
            <img src={top} className='top-left'></img>
            <img src={botlef} className='bottom-left'></img>
            <img src={botrig} className='bottom-right' ></img>
            <div className='header header_style'><img src={svg6} alt="svg6" className="logo" /></div>
            <div className="background-container">
                {/* Add your SVG images as background */}
                <img src={svg1} alt="svg1" className="background-svg" />
                <img src={svg2} alt="svg2" className="background-svg" />
                <img src={svg3} alt="svg3" className="background-svg" />
                <img src={svg4} alt="svg4" className="background-fotter" />


                {/* Add the PNG overlay image */}
                <img src={overlayImage} alt="overlay" className="overlay-image" />
            </div>
        </>
    );
};

export default Background;
