// src/pages/Create.js
import React, { useState, useEffect } from 'react';
import Background from '../components/OtherBG';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
// import { Form, FormRow, FormGroup, FormControl } from 'react-bootstrap';
import { Form, Row, Col, Alert } from 'react-bootstrap';
import { useLocation, useNavigate  } from 'react-router-dom';
import "./css/home.css";

const Create = () => {
    useEffect(() => {
        // Add class to body element when component mounts
        document.body.classList.add('overflow-hidden');

        // Remove class from body element when component unmounts
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, []);
    const cardStyle = {
        WebkitBackdropFilter: "blur(10px)",
        backdropFilter: "blur(10px)",
        color: "#fff",
        borderRadius: "8px", // corrected from border-radius
        border: "1px solid rgba(0, 69, 132, 0.5)",
        background:
          "linear-gradient(270deg, rgba(0, 69, 132, 0.2) 0%, rgba(5, 5, 5, 0.15) 100%)",
        boxShadow:
          "0px 4px 18px 0px rgba(0, 0, 0, 0.16), 0px 4px 100px 0px rgba(0, 0, 0, 0.25) inset",
      };
      const inputBoxStyle = {
        border: "2px solid transparent",
        borderLeft: "0",
        borderRadius: "0px 5px 5px 0px",
        color: "white",
        fontWeight: 300,
    
        outline: "none !important",
    
        backdropFilter: "blur(10px)",
    
        color: "#fff",
        WebkitBackdropFilter: "blur(10px)",
    
        border: "1px solid rgba(0, 69, 132, 0.5)",
        background:
          "linear-gradient(270deg, rgba(0, 69, 132, 0.2) 0%, rgba(5, 5, 5, 0.15) 100%)",
        boxShadow:
          "0px 4px 18px 0px rgba(0, 0, 0, 0.16), 0px 4px 100px 0px rgba(0, 0, 0, 0.25) inset",
        // background: '#08131c'
      };
    //   const cardStylebox ={
    //     WebkitBackdropFilter: "blur(10px)",
    //     boxShadow: "0px 4px 18px 0px rgba(0, 0, 0, 0.16)",
    //     backdropFilter: "blur(10px)",
    //     borderRadius: "25px",
    //   }

    const list = {
        overflow: "visible",
        listStyleType: "disc",
        float: "left",
        color: "#8c8d91"
    }

  
    const [errorMessage, setErrorMessage] = useState('');
    const [copySuccess, setCopySuccess] = useState(false);
    const navigate = useNavigate();


    // Get the location object from React Router
    const location = useLocation();
    const mnemonicData = location.state && location.state.mnemonicData;
    // console.log(mnemonicData.mnemonic) ;

    const handleCopyClick = () => {
        try {
            navigator.clipboard.writeText(mnemonicData.mnemonic);
            setCopySuccess(true);
            setErrorMessage(''); // Clear any previous error messages
        } catch (error) {
            console.error('Error copying mnemonic:', error);
            setErrorMessage('Failed to copy mnemonic');
            setCopySuccess(false); // Reset copy success state
        }
    };

    useEffect(() => {
        if (copySuccess) {
            const timer = setTimeout(() => {
                setCopySuccess(false);
            }, 1500);

            // Cleanup the timer when the component unmounts or when copySuccess changes
            return () => clearTimeout(timer);
        }
    }, [copySuccess]);

    return (
        <>
            <Background />
            <div className="container allbtn-frm mt-5 overlayDIV">
                <div className="row">
                    <div className="col-md-12 d-flex justify-content-center align-items-center vertical-center">
                        <div className="col-md-12 ">
                            <Card className="mb-4 d-flex justify-content-center align-items-center text-center " style={cardStyle}>
                                <Card.Body>
                                    <br />
                                    <h2>Create New Wallet</h2>
                                   <div className='m-auto' >
                                   <ul className='text-start mb-5'>
                                        <li >These 18  wallet words are the recovery key to your wallet and it's assets. You need to make note of these and store in a safe place.</li>

                                        <li>Do not share your words with others, if you lose them, they cannot be recovered.</li>
                                        <li>With the utilization of these specific words, virtually anyone possesses the capability to obtain entry to your new wallet.</li>
                                    </ul>
                                   </div>
                                    {/* Add your Create content here */}
                                    <Form>
                                        {[...Array(3)].map((_, rowIndex) => (
                                            <Row key={rowIndex}>
                                                {[...Array(6)].map((_, colIndex) => (
                                                    <Col key={colIndex} md={2}>
                                                        <Form.Group>
                                                        <div className="cust-form-control  d-flex sh odd" >
                                                        <label className="index-sp1 styleCardCompsmart">{rowIndex * 6 + colIndex + 1}</label>
                                                            <Form.Control
                                                                type="text"
                                                                style={inputBoxStyle}
                                                                placeholder={`Input ${rowIndex * 6 + colIndex + 1}`}
                                                                value={mnemonicData.mnemonic.split(' ')[rowIndex * 6 + colIndex] || ''}
                                                                readOnly
                                                            />
                                                        </div>
                                                        </Form.Group>
                                                    </Col>
                                                ))}
                                            </Row>
                                        ))}
                                        {/* Buttons */}
                                        <br></br>
                                        <Row className='d-flex justify-content-center align-items-center text-center'>
                                            <Col md={2}>
                                                <Button  className="custbtn-primary "  type="button" onClick={handleCopyClick}>
                                                    Copy
                                                </Button>
                                                {/* {copySuccess && <span className="ml-2">Mnemonic Copied</span>} */}
                                            </Col>
                                            <Col md={2}>
                                                <Button  className="custbtn-primary "  type="button" onClick={() => navigate('/access')}>
                                                    I Have Recorded
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                    {/* Form ends here */}
                                    {errorMessage && (
                                        <Alert variant="danger" className="mt-3" onClose={() => setErrorMessage('')} dismissible>
                                            {errorMessage}
                                        </Alert>
                                    )}
                                    {copySuccess && (
                                        <Alert variant="success" className="mt-3" onClose={() => setCopySuccess(false)} dismissible>
                                            Mnemonic Copied
                                        </Alert>
                                    )}
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Create;
