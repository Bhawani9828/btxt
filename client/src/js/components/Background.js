// src/components/Background.js
import React, { useEffect } from 'react';
import './Background.css'; // Import a CSS file for styling if needed
import svg1 from '../assets/Ellipse 74.svg'; // Import your SVG images
import svg2 from '../assets/Ellipse 75.svg';
import svg3 from '../assets/Ellipse 76.svg';
import svg4 from '../assets/Footer-Powered.svg';
import svg5 from '../assets/Group.svg';
import svg6 from '../assets/LOGO.svg';
import top from '../assets/top-left.svg' ;
import botlef from '../assets/botem-left.svg' ;
import botrig from '../assets/bottom-right.svg' ;
import overlayImage from '../assets/Texture.png'; // Import your PNG overlay image

const Background = () => {
    useEffect(() => {
        // Add class to body element when component mounts
        document.body.classList.add('overflow-hidden');

        // Remove class from body element when component unmounts
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, []);
    return (
        <>
            <img src={top} className='top-left' style={{ overflow: 'hidden' }}></img>
            <img src={botlef} className='bottom-left' style={{ overflow: 'hidden' }}></img>
            <img src={botrig} className='bottom-right' style={{ overflow: 'hidden' }}></img>
            <div className='header header_style'><img src={svg6} alt="svg6" className="logo" style={{ overflow: 'hidden' }} /></div>
            <div className="background-container" style={{ overflow: 'hidden' }}>
                {/* Add your SVG images as background */}
                <img src={svg1} alt="svg1" className="background-svg" style={{ overflow: 'hidden' }} />
                <img src={svg2} alt="svg2" className="background-svg" style={{ overflow: 'hidden' }} />
                <img src={svg3} alt="svg3" className="background-svg" style={{ overflow: 'hidden' }} />
                <img src={svg4} alt="svg4" className="background-fotter" style={{ overflow: 'hidden' }} />
                <img src={svg5} alt="svg5" className="side-element" style={{ overflow: 'hidden' }} />


                {/* Add the PNG overlay image */}
                <img src={overlayImage} alt="overlay" className="overlay-image" style={{ overflow: 'hidden' }} />
            </div>
        </>
    );
};

export default Background;
