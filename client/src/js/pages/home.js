// src/pages/Home.js
import React, { useState } from 'react';
import Background from '../components/Background';
import './css/home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card , Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import create from '../assets/ICONS/create.svg'
import access from '../assets/ICONS/access.svg'
import { useNavigate } from 'react-router-dom';
import logoBlack from '../assets/logoFinal.svg'

const Home = () => {
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
    "fontSize": "14px",
    "fontWeight": "400",
    "color": "#89898d"
  }
  const cardHyperlink = {
    "textDecoration" : "none",
    "fontSize": "16px"
  }

  const navigate = useNavigate();
  const [mnemonicData, setMnemonicData] = useState(null);

  const handleJoinNow = async () => {
    try {
      // Make a request to the API endpoint
      const response = await fetch('https://btxt.app/api2/generate');
      const data = await response.json();

      // Save the mnemonic data in the state
      setMnemonicData(data);

      // Navigate to the "/create" screen with mnemonic data as state
      navigate('/create', { state: { mnemonicData: data } });
    } catch (error) {
      console.error('Error fetching mnemonic data:', error);
    }
  };


  return (
    <>
      <Background />
      <div className="container pt-80 overlayDIV">
        <div className="row">
          <div className="col-md-6  ">
       <div className='mb-5'>
<div className='row'>
<div className="col-md-10  ">
          
          <div className=''>
          <div className="styleCardComp p-4">
    <img src={create} className="card-img-top" />
    <div className="card-body">
      <h2 className='text-center'>Create</h2>
      <p className="card-text text-center" style={cardText}>Secure Your Crypto: Create Mnemonics for your blockchain wallet. Safeguard access with a memorable phrase.</p>
     <div className='d-flex justify-content-center'>
     <Link onClick={handleJoinNow} style={cardHyperlink}>
                  <Card.Text >Join Now</Card.Text>
                  </Link>
     </div>
    </div>
  </div>
          </div>
           
  
              </div>
</div>
       </div>
       <div className=''>
<div className='row'>
<div className="col-md-10  ">
          
          <div className=''>
          <div className="styleCardComp p-4">
    <img src={access} className="card-img-top" />
    <img src={logoBlack} className="card-img-top" style={{display:"none"}}/>
    <div className="card-body">
      <h2 className='text-center'>Access</h2>
      <p className="card-text text-center" style={cardText}>Access Mnemonics: Safeguard blockchain wallet entry. Get a way in with your secure phrase for easy yet protected access.</p>
      <div className='d-flex justify-content-center'>
      <Link to="/access" style={cardHyperlink}>
                  <Card.Text >Get Started</Card.Text>
                  </Link>
     </div>
    </div>
  </div>
          </div>
           
  
              </div>
</div>
       </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
