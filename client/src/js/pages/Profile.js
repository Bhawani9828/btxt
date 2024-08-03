import React, { useEffect, useState } from "react";
import Background from "../components/OtherBG";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "./css/home.css";
import axios from "axios";
function Profile() {

    const navigate = useNavigate();
    const [proPic, setProPic] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const address = localStorage.getItem("address");
    const [proisDynamic, setproisDynamic] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        document.body.classList.add("overflow-hidden");
        return () => {
          document.body.classList.remove("overflow-hidden");
        };
      }, []);

      useEffect(() => {
        fetch(`https://btxt.app/api2/profile-picture/${address}`).then((response)=>{
          if(response.status === 404){
            setProPic(`https://blocxscan.com/fav.png`);
          }else{
            setProPic(`https://btxt.app/api2/profile-picture/${address}`);
            setproisDynamic(false)
          }
      }) 
      }, [address]);

      const handleCloseAlert = () => {
        setShowAlert(false);
        navigate('/messaging');
      };


      const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        if (file) {
          setProPic(URL.createObjectURL(file)); // Preview the selected image
        }
      };
    
      const handleUpload = async () => {
        if (!selectedFile) {
          setErrorMessage('Please select a file');
          return;
        }
    
        const formData = new FormData();
        formData.append('profilePicture', selectedFile);
        formData.append('username', localStorage.getItem('address'));
        formData.append('fileType', selectedFile.type);
    
        try {
          const response = await axios.post(
            'https://btxt.app/api2/upload',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );
          // console.log('Upload response:', response);
          if (response && response.data && response.data.url) {
            setProPic(response.data.url);
            setAlertMessage('Profile picture updated successfully');
            setShowAlert(true);
          } else {
            setAlertMessage('Profile picture updated successful');
            setShowAlert(true);
          }
        } catch (error) {
          console.error('Error uploading file:', error);
          setErrorMessage('Error uploading file');
        }
      };


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

    const modalStyle = {
     
       
        width: '100%',
        height: '100%',
      
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      };
      
      const modalContentStyle = {
        marginBottom:'14px',
       
        borderRadius: '5px',
        textAlign: 'center',
      };
    
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
                <h2 className="mb-lg-5 mb-3">Add Profile Picture</h2>
                <div>
                  <div className="row">
                   
                    <div className="col-lg-12 ">
                      <div className="p-5" style={list}>
                        {/* <a className='text-white' href='/'>https://btxt.app/api2</a> */}
                        
                          {/* Bootstrap Modal */}
               
                  <div className="" >
                  
                     
                      
                        <div className="">
                          <img
                            className="image-fluid"
                            src={proPic} 
                            alt="Profile"
                            style={{maxHeight:"100px", maxWidth:"100px",margin:'auto',display:'flex'}}
                          />

                          
                          <input
                          className="my-3"
                            type="file"
                            onChange={handleFileChange}
                            accept=".png,.jpg,.jpeg"
                            style={{background:'rgb(8, 19, 28)'}}
                          />
                        </div>
                        {showAlert && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <p>{alertMessage}</p>
            <button className="custbtn-primary" onClick={handleCloseAlert}>Get Started</button>
          </div>
        </div>
      )}
                        <div className="">
                         
                          <button
                            type="button"
                            className="custbtn-primary"
                            onClick={handleUpload}
                          >
                            Upload
                          </button>
                        </div>
                     
                  
                  </div>
           
                {/* End Bootstrap Modal */}
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
  )
}

export default Profile