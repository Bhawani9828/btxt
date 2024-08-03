// MobileStaticPage.js


import React, { useEffect, useState } from 'react';
import Background from '../components/OtherBG';
import './css/home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card , Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import create from '../assets/ICONS/create.svg'
import access from '../assets/ICONS/access.svg'
import '../components/Background.css'; // Import a CSS file for styling if needed
import svg1 from '../assets/Ellipse 74.svg'; // Import your SVG images
import svg2 from '../assets/Ellipse 75.svg';
import svg3 from '../assets/Ellipse 76.svg';
import svg4 from '../assets/Footer-Powered.svg';
import svg6 from '../assets/LOGO.svg';
import top from '../assets/top-left.svg' ;
import botlef from '../assets/botem-left.svg' ;
import botrig from '../assets/bottom-right.svg' ;
import overlayImage from '../assets/Texture.png';

const MobileStaticPage = () => {
    useEffect(() => {
        document.body.classList.add("overflow-hidden");
        return () => {
          document.body.classList.remove("overflow-hidden");
        };
      }, []);
      
    const cardStyle = {
        // backgroundColor: "#14141b",
        color: "white",
        border: "3px solid transparent",
        borderRadius: "50px",
        // borderImage: "linear-gradient(to bottom, red, blue) 3",
        background: "linear-gradient(163deg, rgb(38 100 182 / 15%) 5%, rgb(24 44 134 / 0%) 50%), linear-gradient(163deg, rgb(38 100 182 / 15%) 5%, rgb(24 44 134 / 0%) 50%) border-box",
        boxShadow: "7px 12px 5px -3px black",
        
        // border: "3px solid transparent"
      };
      const cardText = {
        "fontSize": "17px",
        "fontWeight": "400",
        "color": "#89898d"
      }
      const cardHyperlink = {
        "textDecoration" : "none",
        "fontSize": "16px"
      }
  return (
    
    <>
    <img src={top} className='top-left'></img>
            <img src={botlef} className='bottom-left'></img>
            <img src={botrig} className='bottom-right' ></img>
            <div className='header header_style_mob'><img src={svg6} alt="svg6" className="logo" /></div>
            <div className="background-container">
                {/* Add your SVG images as background */}
                <img src={svg1} alt="svg1" className="background-svg" />
                <img src={svg2} alt="svg2" className="background-svg" />
                <img src={svg3} alt="svg3" className="background-svg" />
                <img src={svg4} alt="svg4" className="background-fotter" />


                {/* Add the PNG overlay image */}
                <img src={overlayImage} alt="overlay" className="overlay-image" />
            </div>
    <div className="container m_veiw  overlayDIV">
      <div className="m_v_o">
      <div className="styleCardComp d-flex justify-content-center align-items-center p-4">
  
  <div className="card-body">
    <h2 className='text-center mb-3'>B.TXT Web</h2>
    <p className="card-text text-center" style={cardText}>To use B.TXT, open it from a Desktop device. Mobile app Coming Soon!</p>
    <div className='d-flex justify-content-center'>
   
   </div>
  </div>
</div>
      </div>
    </div>
  </>
  );
};

export default MobileStaticPage;
