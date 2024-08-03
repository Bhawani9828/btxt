// src/pages/Masternode.js
import React, { useEffect, useState } from "react";
import Background from "../components/OtherBG";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
// import { Form, FormRow, FormGroup, FormControl } from 'react-bootstrap';
import img404 from '../assets/404.png' ;

const NotFound = () => {
  // const words = localStorage.getItem("keyW") ;
  const navigate = useNavigate();
  // const [errorMessage, setErrorMessage] = useState("");
  const cardStyle = {
    WebkitBackdropFilter: "blur(10px)",
    backdropFilter: "blur(10px)",
    color:'#fff',
    borderRadius: "8px", // corrected from border-radius
    border: "1px solid rgba(0, 69, 132, 0.5)",
    background: "linear-gradient(270deg, rgba(0, 69, 132, 0.2) 0%, rgba(5, 5, 5, 0.15) 100%)",
    boxShadow: "0px 4px 18px 0px rgba(0, 0, 0, 0.16), 0px 4px 100px 0px rgba(0, 0, 0, 0.25) inset",
  };

  const list = {
    overflow: "visible",
    borderRadius: "8px", // corrected from border-radius
    border: "1px solid rgba(0, 69, 132, 0.5)",
    background: "linear-gradient(270deg, rgba(0, 69, 132, 0.2) 0%, rgba(5, 5, 5, 0.15) 100%)",
    boxShadow: "0px 4px 18px 0px rgba(0, 0, 0, 0.16), 0px 4px 100px 0px rgba(0, 0, 0, 0.25) inset",
    cursor: 'pointer',
    
    
    color: "#fff !important",
    WebkitBackdropFilter: "blur(10px)", 
   
    
    
    backdropFilter: "blur(10px)",
  
  };
  const inputBoxStyle = {

    border: "2px solid transparent",
    borderLeft: "0",
    borderRadius: "0px 5px 5px 0px",
    color: "white",
    fontWeight: 300,
    width: "-webkit-fill-available",
    outline: "none !important",
    
    backdropFilter: "blur(10px)",
 
    color:'#fff',
    WebkitBackdropFilter: "blur(10px)",
 
    border: "1px solid rgba(0, 69, 132, 0.5)",
    background: "linear-gradient(270deg, rgba(0, 69, 132, 0.2) 0%, rgba(5, 5, 5, 0.15) 100%)",
    boxShadow: "0px 4px 18px 0px rgba(0, 0, 0, 0.16), 0px 4px 100px 0px rgba(0, 0, 0, 0.25) inset",
   
};

  const handleAccessWalletClick = () =>{
    navigate("/messaging") ;
  }

  useEffect(() => {
    // Add class to body element when component mounts
    document.body.classList.add("overflow-hidden");

    // Remove class from body element when component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <>
      <Background />
      <div className="container  mt-5 overlayDIV">
        <div className="row">
          <div className="col-md-8 m-auto d-flex justify-content-center align-items-center vertical-center">
            <div className="col-md-12">
              <Card
                className="mb-4 p-lg-5 d-flex justify-content-center align-items-center text-center"
                style={cardStyle}
              >
                <Card.Body>
                  <h2 className="mb-lg-5 mb-3">404 Not Found</h2>
                  <div className="" style={{width:'200px',marginBottom:'8px'}}>
                    <img className="img-fluid  " src={img404}/>
                  </div>
                  <div>
                    <div className="row">
                      <div className="col-lg-12 ">
                        <div className="p-2"  style={list} onClick={handleAccessWalletClick}>
                          <span
                          className="bg-transparent text-white underline-none"
                            variant="primary"
                            type="button" 
                          >
                          To Messaging
                          </span>
                        </div>
                      </div>
                      </div>
                    </div>
                  
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
