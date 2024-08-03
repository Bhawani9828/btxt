// src/pages/Masternode.js
import React, { useEffect, useState } from "react";
import Background from "../components/OtherBG";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
// import { Form, FormRow, FormGroup, FormControl } from 'react-bootstrap';
import { Form, Row, Col, Alert } from "react-bootstrap";

const Masternode = () => {
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

  // const handleAccessWalletClick = () => {
  //   // Assuming the API endpoint is https://btxt.app/api2/access-wallet
  //   const apiUrl = "https://btxt.app/api2/access-wallet";
  //   const storeApiUrl = "https://btxt.app/api2/store-address";

  //   fetch(apiUrl, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ mnemonic: words }),
  //   })
  //     .then((response) => {
  //       if (response.status === 200) {
  //         // navigate('/videoCall');
  //         return response.json();
  //       } else {
  //         setErrorMessage("Error accessing wallet. Please try again.");
  //         throw new Error("Error accessing wallet. Status: " + response.status);
  //       }
  //     })
  //     .then((data) => {
  //       // console.log("API Response:", data);
  //       // localStorage.setItem("address", data.address);
  //       // localStorage.setItem("keyW", words);

  //       fetch(storeApiUrl, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ userAddress: data.address }),
  //       })
  //         .then((apiResponse) => {
  //           if (apiResponse.status === 200) {
  //             console.log(
  //               "User address sent to server for storage successfully"
  //             );
  //           } else {
  //             console.error(
  //               "Error sending user address to server. Status:",
  //               apiResponse.status
  //             );
  //           }
  //         })
  //         .catch((apiError) => {
  //           console.error("Error sending user address to server:", apiError);
  //         });

  //       // navigate("/video", { state: { data: data.address } });
  //       navigate("/messaging", { state: { data: data.address } });
  //       // navigate("/messaging", { state: { data: data.address } });
  //     })
  //     .catch((error) => {
  //       console.error("Error accessing wallet:", error);
  //       setErrorMessage("Error accessing wallet. Please try again.");
  //     });
  // };

  const handleAccessWalletClick = () =>{
    navigate("/Profile") ;
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
          <div className="col-md-12 d-flex justify-content-center align-items-center vertical-center">
            <div className="col-md-12">
              <Card
                className="mb-4 p-lg-5 d-flex justify-content-center align-items-center text-center"
                style={cardStyle}
              >
                <Card.Body>
                  <h2 className="mb-lg-5 mb-3">Available Servers</h2>
                  <div>
                    <div className="row">
                      {/* <div className="col-lg-6 mb-4">
                        <div className="p-5" style={list}>
                        <NavLink
                        className="bg-transparent text-white"
                            type="button"
                            onClick={navigate("/messaging")}
                          >
                            http://localhost:5000
                          </NavLink>
                        </div>
                      </div> */}
                      
                      <div className="col-lg-12 ">
                        <div className="p-5"  style={list} onClick={handleAccessWalletClick}>
                          {/* <a className='text-white' href='/'>https://btxt.app/api2</a> */}
                          <h4 className="mt-0">Masternode 1</h4>
                          <span
                          className="bg-transparent text-white underline-none"
                            variant="primary"
                            type="button"
                            
                          >
                          IP=103.69.196.122
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

export default Masternode;
