import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/messaging.css";
import "./css/home.css";
import { Link } from 'react-router-dom';
import create from '../assets/ICONS/create.svg'
function Profile() {
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [roomIdUser, setRoomIdUser] = useState("");
  const [address, setAddress] = useState("");
  const [proPic, setProPic] = useState("");

  useEffect(() => {
    setRoomIdUser(localStorage.getItem("roomIdUser"));
  }, [roomIdUser]);

  useEffect(() => {
    setAddress(localStorage.getItem("address"));
    setProPic(`https://btxt.app/api2/profile-picture/${address}`);
  }, [address]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setErrorMessage("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", selectedFile);
    formData.append("username", localStorage.getItem("address")); // Retrieve username from localStorage
    formData.append("fileType", selectedFile.type); // Add the file type

    try {
      const response = await axios.post(
        "https://btxt.app/api2/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Profile picture updated successfully");
      setShowModal(false);
    } catch (error) {
      setErrorMessage("Error uploading file");
    }
  };

  useEffect(() => {
    // fetch(`https://api-explorer.blocxscan.com/ext/getaddresstxs/${roomIdUser}/0/5`)
    fetch(
      `https://api-explorer.blocxscan.com/ext/getaddresstxs/BFBbV5G5EsMuYzSgK1R87ZyPVXkdwXiXL5/0/5`
    )
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) =>
        console.error("Error fetching transaction data:", error)
      );
  }, []);

  function TransactionItem({ transaction }) {
    const txidShortened = transaction.txid.substring(0, 12) + "...";
    const amount =
      transaction.sent !== 0 ? transaction.sent : transaction.received;
    const colorClass = transaction.sent !== 0 ? "sent" : "received";

    return (
      <div className="transaction-item">
        <span>{txidShortened}</span>{" "}
        <span className={colorClass}>{amount}</span>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 d-flex justify-content-center align-items-center text-center styleCardComp">
        <img src={create} className="card-icon"></img>
        <div>
          <h2>Create</h2>
          <p>
            Secure Your Crypto: Create Mnemonics for your blockchain wallet.
            Safeguard access with a memorable phrase.
          </p>
          <br></br>
          {/* <Card.Text>Join Now</Card.Text> */}
          <Link>
            <p>Join Now</p>
          </Link>
        </div>
      </div>

      <div className="img" onClick={() => setShowModal(true)}>
        <img
          className="image-fluid pro_img"
          src={proPic}
          alt="Profile"
        />
      </div>

      {/* Bootstrap Modal */}
      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Profile Picture
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <img
                className="image-fluid"
                src={proPic}
                alt="Profile"
              />
              <input
                type="file"
                onChange={handleFileChange}
                accept=".png,.jpg,.jpeg"
              />
              {errorMessage && <p>{errorMessage}</p>}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpload}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End Bootstrap Modal */}

      <h1>Transaction Data</h1>
      <div className="transaction-list">
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.txid} transaction={transaction} />
        ))}
      </div>
    </div>
  );
}

export default Profile;
