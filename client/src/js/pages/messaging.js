// src/pages/Masternode.js
import React, { useEffect, useState, useReducer, useRef } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/messaging.css";
import Vector from "../assets/ICONS/Vector.svg";
import darkwalletImg from "../assets/icon-park--wallet-three-black.svg";
import lightwalletImg from "../assets/icon-park--wallet-three 1.svg";
import binan from "../assets/bainre.png";
import ethri from "../assets/ethrim.png";
import right_arrow from "../assets/right_arrow.svg";
import qr_scan from "../assets/qr_scan.svg";
import smile from "../assets/smile.svg";
// import InputGroup from "react-bootstrap/InputGroup";
import Gun from "gun/gun";
import { useLocation } from "react-router-dom";
import logo from "../assets/LOGO.svg";
import InputEmoji from "react-input-emoji";
import { InputGroup, Dropdown, FormControl, Modal } from "react-bootstrap";
import { HiUserGroup } from "react-icons/hi2";
import { MdGroupAdd } from "react-icons/md";
import blocx from "../assets/blox.png";
import axios from "axios";
import darkSearchImg from "../assets/search_black.svg";
import lightSearchImg from "../assets/search_white.svg";
import QRCode from "qrcode.react";
import CryptoJS from "crypto-js";

import VideoCall from "./videoCall";
import info from "../assets/info.svg";
import svg1 from "../assets/Ellipse 74.svg"; // Import your SVG images
import svg2 from "../assets/Ellipse 75.svg";
import svg3 from "../assets/Ellipse 76.svg";
import svg4 from "../assets/VectorBlack.svg";
import attch from "../assets/attche.svg";
import { Form, Col, Alert } from "react-bootstrap";

import Select, { components } from "react-select";

const gun = Gun({
  peers: ["https://btxt.app/api2/gun"],
});

const currentState = {
  messages: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return {
        messages: [action.message, ...state.messages],
      };
    case "CLEAR_MESSAGES":
      return {
        messages: [], // Clear the messages array
      };
    default:
      return state;
  }
};

const options = [
  {
    value: "BLOCX Mainnet",
    selected: true,
    label: "BLOCX Mainnet",
    dataSrc: blocx,
  },
  {
    value: "Ethereum Mainnet",
    selected: false,
    label: "Ethereum Mainnet",
    dataSrc: ethri,
  },
  {
    value: "Binance Smart Chain",
    selected: false,
    label: "Binance Smart Chain",
    dataSrc: binan,
  },
];

const Messaging = () => {
  const location = useLocation();
  const inputRef = useRef(null);
  const [messageText, setMessageText] = useState("");
  const [state, dispatch] = useReducer(reducer, currentState);
  const [roomId, setRoomId] = useState(
    location.state?.data || localStorage.getItem("address")
  );
  const [roomIdUser, setRoomIdUser] = useState("");
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [roomDetails, setRoomDetails] = useState([]);
  const [isSelectionMode, setIsSelectionMode] = useState([0]);
  const handleShow = () => setShowOffcanvas(true);
  const [isDark, setIsDark] = useState(false); // State variable for theme
  const address = localStorage.getItem("address");

  // NEW NAVBARJS
  const [loading, setLoading] = useState(true);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [selectedOption, setSelectedOption] = useState("BLOCX Mainnet");
  const [balance, setBalance] = useState(null);
  const [usd, setUSD] = useState(null);
  const [ethusd, setETHUSD] = useState(null);
  const [bscusd, setBSCusd] = useState(null);
  const [userEthAddress, setuserEthAddress] = useState(null);
  const [ethPrivateKey, setEthPrivateKey] = useState(null);
  const [EthBalance, setEthBalance] = useState();
  const [BscBalance, setBscBalance] = useState();
  const [transaction, setTransaction] = useState([]);
  const [alladd, setAlladd] = useState([]);
  const [showoffcanvas, setShowOffcanvas] = useState();
  const [ETHcurrentPage, setETHCurrentPage] = useState(1);
  const [BSCcurrentPage, setBSCCurrentPage] = useState(1);
  const [messages11, setMessages11] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [FilteredRoomsGroup, setFilteredRoomsGroup] = useState([]);
  
  // PROFILE PICTURE UPDATE
  const [proPic, setProPic] = useState("");
  const [proPicGroup, setProPicGroup] = useState(
    "https://btxt.app/api2/profile-picture/BLOCX_Group"
  );
  const [userproPic, setUserProPic] = useState("");
  const [isDynamic, setisDynamic] = useState(true);
  const [proisDynamic, setproisDynamic] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileGroup, setSelectedFileGroup] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessagec, setErrorMessagec] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const [tranSuccess, setTranSuccess] = useState(false);
  const [errorMessageTrans, seterrorMessageTrans] = useState(false);

  const [utxo, setUtxo] = useState([]);
  const [receiverAddress, setReceiverAddress] = useState("");
  const [ammount, setAmmount] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");
  const [transactionStatusS, setTransactionStatusS] = useState("");
  //For telegram like group
  const [group, setGroup] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [teleError, setTeleError] = useState(null);
  const wrapperRef = useRef(null);
  const [invitations, setInvitations] = useState([]);
  const [pendingInvitations, setPendingInvitations] = useState([]);
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const [inviteeEmail, setInviteeEmail] = useState("");
  const [selectedGroup, setSelectedGroup] = useState([]); // Example group
  const filteredRooms = roomDetails.filter((room) =>
    room.receiver && room.receiver.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [availableGroups, setAvailableGroups] = useState([]);


  const sendInvitation = () => {
    const newInvitation = {
      group: selectedGroup,
      email: inviteeEmail,
      roomId: roomId,
    };
    setInvitations([...invitations, newInvitation]);
    setShowInvitationModal(false);
    setInviteeEmail("");
  };

  const acceptInvitation = (invitation) => {
    setPendingInvitations(pendingInvitations.filter((inv) => inv !== invitation));
    setRoomId(invitation.roomId);
    setRoomIdUser(invitation.email);
  };

  useEffect(() => {
    const fetchedInvitations = [
      { group: "Group 1", email: "user@example.com", roomId: "exampleRoomId" },
    ];
    setPendingInvitations(fetchedInvitations);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      setProPic(URL.createObjectURL(file)); // Preview the selected image
    }
  };

  const handleGroupChange = (e) => {
    const file = e.target.files[0];
    setSelectedFileGroup(file);
    if (file) {
      setProPicGroup(URL.createObjectURL(file)); // Preview the selected image
    }
  };

  // Fetch rooms data from API when component mounts
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("https://btxt.app/api2/rooms");
        setGroup(response.data);
        // console.log("ROOMSS ::: ", JSON.stringify(response.data, null, 2));
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setTeleError("Failed to fetch group data"); // Set error state if fetching fails
      }
    };

    fetchRooms();
  }, []);

  console.log("GROUP DATA :::: ", JSON.stringify(group, null, 2));

  //For telegram like group ENDS HERE

  const handleUpload = async () => {
    if (!selectedFile) {
      setErrorMessage("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", selectedFile);
    formData.append("username", localStorage.getItem("address"));
    formData.append("fileType", selectedFile.type);

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
      // console.log('Upload response:', response);
      if (response && response.data && response.data.url) {
        setProPic(response.data.url);
        alert("Profile picture updated successfully");
        setShowModal(false);
      } else {
        alert("Profile picture updated successfully");
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setErrorMessage("Error uploading file");
    }
  };
  // ENDS HERE

  const [currentAddressIndex, setCurrentAddressIndex] = useState(0);

  const handleGenerateAddress = (direction) => {
    if (direction === "next") {
      setCurrentAddressIndex((prevIndex) => prevIndex + 1);
    } else if (direction === "prev") {
      setCurrentAddressIndex((prevIndex) => prevIndex - 1);
    }
  };

  const key = localStorage.getItem("keyW");
  const keyW = key;

  const fetchData = async (option) => {
    // console.log("KEY --- ", keyW);
    setLoading(true);

    let apiUrl;
    let requestData;
    switch (option) {
      case "BLOCX Mainnet":
        apiUrl = {
          totalBalance: {
            url: "https://btxt.app/api2/totalbalance",
            method: "POST",
            data: { mnemonic: keyW },
          },
          rateUSD: {
            url: "https://api.coingecko.com/api/v3/simple/price?ids=blocx-2&vs_currencies=usd",
            method: "GET",
          },
          transaction: {
            url: "https://btxt.app/api2/addresstxall",
            method: "POST",
            data: { mnemonic: keyW },
          },
          addressList: {
            url: "https://btxt.app/api2/addresslist",
            method: "POST",
            data: { mnemonic: keyW },
          },
        };
        break;
      case "Ethereum Mainnet":
        try {
          const generateWalletResponse = await axios.post(
            "https://btxt.app/api2/generate-ethereum-wallet",
            { mnemonic: keyW }
          );
          const ethAdd = generateWalletResponse.data?.address;
          setuserEthAddress(generateWalletResponse.data?.address);
          setEthPrivateKey(generateWalletResponse.data?.privateKey);

          const ethBalanceUrl = `https://api.etherscan.io/api?module=account&action=balance&address=${ethAdd}&tag=latest&apikey=PUF6DTZSKG8H8UATWYKZ5RDRY7N29F4MXD`;

          const ethBalanceResponse = await axios.get(ethBalanceUrl);
          const ethBalance = ethBalanceResponse.data.result;
          // console.log("EBALANCE ---- ", ethBalance) ;

          setEthBalance(ethBalance);

          const ethTransactionUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${userEthAddress}&startblock=0&endblock=99999999&page=${ETHcurrentPage}&offset=5&sort=asc&apikey=PUF6DTZSKG8H8UATWYKZ5RDRY7N29F4MXD`;

          const ethTransactionResponse = await axios.get(ethTransactionUrl);
          const ethTransactions = ethTransactionResponse.data.result;

          // console.log("ETRANSACTION ---- ", JSON.stringify(ethTransactions, null, 2));

          setETHTransaction(ethTransactions);

          const ETHrateusd = `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`;

          const ethUSD = await axios.get(ETHrateusd);
          const ethUSDData = ethUSD.data["ethereum"].usd;

          setETHUSD(ethUSDData);

          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }

        break;
      case "Binance Smart Chain":
        try {
          // const generateWalletResponse = await axios.post(
          //   "https://btxt.app/api2/generate-ethereum-wallet",
          //   { mnemonic: keyW }
          // );
          // const userEthAddress = generateWalletResponse.data?.address;
          // setuserEthAddress(generateWalletResponse.data?.address);

          const bscBalanceUrl = `https://api.bscscan.com/api?module=account&action=balance&address=${userEthAddress}&apikey=K2W86S2MV2MHPHQIMYZUPGG5634QKM3YHW`;

          const bscBalanceResponse = await axios.get(bscBalanceUrl);
          const bscBalance = bscBalanceResponse.data.result;
          // console.log("EBALANCE ---- ", ethBalance) ;

          setBscBalance(bscBalance);

          const bscTransactionUrl = `https://api.bscscan.com/api?module=account&action=txlist&address=${userEthAddress}&startblock=0&endblock=99999999&page=${BSCcurrentPage}&offset=5&sort=asc&apikey=K2W86S2MV2MHPHQIMYZUPGG5634QKM3YHW`;

          const bscTransactionResponse = await axios.get(bscTransactionUrl);
          const bscTransactions = bscTransactionResponse.data.result;

          // console.log("ETRANSACTION ---- ", JSON.stringify(ethTransactions, null, 2));

          setBSCTransaction(bscTransactions);

          const BSCrateusd = `https://api.coingecko.com/api/v3/simple/price?ids=binance-bridged-usdt-bnb-smart-chain&vs_currencies=usd`;

          const bscUSD = await axios.get(BSCrateusd);
          const bscUSDData =
            bscUSD.data["binance-bridged-usdt-bnb-smart-chain"].usd;

          setBSCusd(bscUSDData);

          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }

        break;
      default:
        // Handle default case or error if needed
        break;
    }

    // Make API calls based on the selected option
    if (apiUrl) {
      try {
        const responses = await Promise.all(
          Object.entries(apiUrl).map(async ([key, value]) => {
            const { url, method, data } = value;
            if (method === "GET") {
              return axios.get(url);
            } else if (method === "POST") {
              return axios.post(url, data);
            }
          })
        );

        responses.forEach((response, index) => {
          const responseData = response.data;
          switch (Object.keys(apiUrl)[index]) {
            case "totalBalance":
              setBalance(responseData.totalBalance);
              break;
            case "rateUSD":
              setUSD(responseData["blocx-2"].usd);
              break;
            case "transaction":
              setTransaction(responseData.transactions);
              break;
            case "addressList":
              setAlladd(responseData.addressList);
              break;

            default:
              // Handle default case or error if needed
              break;
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    // console.log("USER ETH ADDRESS ::::", userEthAddress) ;
    // console.log("USER ETH PRIVATE KEY ::::", ethPrivateKey) ;
    fetchData(selectedOption);
  }, [selectedOption, userEthAddress, ETHcurrentPage, BSCcurrentPage]);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption.value);
    fetchData(selectedOption.value);
  };

  const handleChangeInput = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (
      group.filter((room) =>
        room.name.toLowerCase().includes(value.toLowerCase())
      ).length === 0
    ) {
      setSearchTerm(value);
      setIsDropdownVisible(false);
    } else {
      setSearchTerm("");
      setIsDropdownVisible(true);
    }
  };

  function getMessageHeight(content) {
    const lineHeight = 20;
    const words = content.split(" ");
    const lines = Math.ceil(words.length / 10);
    return `${lines * lineHeight}px`;
  }

  // ENDS HERE

  // HERE GENRATED THE ROOM ID
  const generateSharedRoomId = (username1, username2) => {
    const sortedUsernames = [username1, username2].sort();
    const combinedUsernames = sortedUsernames.join("_");
    const hashedRoomId = CryptoJS.SHA256(combinedUsernames).toString(
      CryptoJS.enc.Hex
    );
    return hashedRoomId;
  };
  // GENRATION OF ROOM ID ENDS HERE

  // HERE GENRATED THE GROUP
  const generateGroup = async (groupName) => {
    console.log("FUNCTION CALLED WITH G NAME ::: ", groupName);
    try {
      const response = await axios.post("https://btxt.app/api2/rooms", {
        name: groupName,
      });
      const message = response.data.message || "Group created successfully";
      alert(message);
      return response.data.name;
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.error || "An error occurred");
      } else {
        alert("Network error");
      }
      
    }
  };

  // const handleSubmitGroup = async (event) => {
  //   event.preventDefault();
  //   const groupName = event.target.elements.groupID.value;
  //   if (groupName && selectedFileGroup) {
  //     const createdRoomName = await generateGroup(groupName);
  //     // if (!selectedFileGroup) {
  //     //   setErrorMessage("Please select a file");
  //     //   return;
  //     // }
  //     const formData = new FormData();
  //     formData.append("profilePicture", selectedFileGroup);
  //     formData.append("username", groupName);
  //     formData.append("fileType", selectedFileGroup.type);

  //     try {
  //       const response = await axios.post(
  //         "https://btxt.app/api2/upload",
  //         formData,
  //         {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       );
  //       // console.log('Upload response:', response);
  //       if (response && response.data && response.data.url) {
  //         setProPicGroup(response.data.url);
  //       }
  //     } catch (error) {
  //       console.error("Error uploading file:", error);
  //     }

  //     if (createdRoomName) {
  //       setRoomId(createdRoomName);
  //       setRoomIdUser(createdRoomName);
  //     } else {
  //       // Handle error case here, if needed
  //     }
  //   } else {
  //     alert("Please select a profile picture");
  //   }
  // };

  const handleSubmitGroup = async (event) => {
    event.preventDefault();
    const groupName = event.target.elements.groupID.value;
    const description = event.target.elements.channelDescription.value;
  
    if (groupName && selectedFileGroup && selectedRooms.length > 0) {
      try {
        const groupRoomId = await generateGroup(groupName);
  
        // Upload group profile picture
        const formData = new FormData();
        formData.append("profilePicture", selectedFileGroup);
        formData.append("username", groupName);
        formData.append("fileType", selectedFileGroup.type);
  
        const response = await axios.post(
          "https://btxt.app/api2/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        let groupPictureUrl = '';
        if (response && response.data && response.data.url) {
          groupPictureUrl = response.data.url;
          setProPicGroup(groupPictureUrl);
        }
  
        // Store group info in gun database
        gun.get(`GROUP${groupRoomId}`).put({
          name: groupName,
          description: description,
          creator: address,
          createdAt: Date.now(),
          pictureUrl: groupPictureUrl,
          roomIds: selectedRooms,
          members: {} // Initialize an empty object for members
        });
        addUserToGroup(groupRoomId, address);
         // Switch to the new group chat
      setRoomId(groupRoomId);
      setRoomIdUser(groupRoomId);
      selectedRooms.forEach(userId => {
        addUserToGroup(groupRoomId, userId);
      });
        // Close the modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('idGroupModel'));
      modal.hide();

        // Clear selected rooms
        setSelectedRooms([]);
  
      } catch (error) {
        console.error("Error creating group:", error);
        alert("An error occurred while creating the group. Please try again.");
      }
    } else {
      alert("Please provide a group name and select a profile picture");
    }
  };
  // GENRATION OF GROUP ENDS HERE

  useEffect(() => {
    localStorage.setItem("roomId", roomId);
  }, [roomId]);

  useEffect(() => {
    localStorage.setItem("roomIdUser", roomIdUser);
    fetch(`https://btxt.app/api2/profile-picture/${roomIdUser}`).then(
      (response) => {
        if (response.status === 404) {
          setUserProPic(`https://blocxscan.com/fav.png`);
        } else {
          setUserProPic(`https://btxt.app/api2/profile-picture/${roomIdUser}`);
          setisDynamic(false);
        }
      }
    );
    // setUserProPic(`https://btxt.app/api2/profile-picture/${roomIdUser}`);
    setReceiverAddress(roomIdUser);
  }, [roomIdUser]);

  useEffect(() => {
    fetch(`https://btxt.app/api2/profile-picture/${address}`).then(
      (response) => {
        if (response.status === 404) {
          setProPic(`https://blocxscan.com/fav.png`);
        } else {
          setProPic(`https://btxt.app/api2/profile-picture/${address}`);
          setproisDynamic(false);
        }
      }
    );
  }, [address]);

  const messagesArray = [];
  useEffect(() => {
    const fetchDataFromLocalStorage = async () => {
      const localStorageData = localStorage.getItem("gun/");
      if (localStorageData) {
        const parsedData = JSON.parse(localStorageData);
        for (const key in parsedData) {
          if (key.startsWith("MESSAGES")) {
            const messageId = key.substring("MESSAGES".length);
            messagesArray.push(messageId);
          }
        }
      }
      setMessages11(messagesArray);
    };
    fetchDataFromLocalStorage();
  }, []);

  const fetchDataFromLocalStorage = async () => {
    const localStorageData = localStorage.getItem("gun/");
    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      for (const key in parsedData) {
        if (key.startsWith("MESSAGES")) {
          const messageId = key.substring("MESSAGES".length);
          // Check if messageId is not already in messagesArray
          if (!messagesArray.includes(messageId)) {
            messagesArray.push(messageId);
          }
        }
      }
    }
    setMessages11(messagesArray);
  };

  // SIDEBAR MESSAGING SCREEN COMPONENT
  const senderMap = new Map();
  useEffect(() => {
    const fetchDataFromGun = async () => {
      try {
        let i = 0;
        for (const rID of messages11) {
          const messagesRef = gun.get(`MESSAGES${rID}`).map();
          // console.log("INDEX :: ",i," ROOM DATA :: ",messagesRef) ;
          // i++ ;
          messagesRef.once((data, key) => {
            if (data) {
              const { sender, avatar, content, timestamp, receiver } = data;
              if (data.sender) {
                if (data.sender == address) {
                  senderMap.set(rID, {
                    sender,
                    avatar,
                    content,
                    timestamp,
                    receiver,
                  });
                  // console.log(
                  //   "INDEX :: ",
                  //   i,
                  //   " ROOM :: ",
                  //   rID,
                  //   " ROOM DATA :: ",
                  //   data.content
                  // );
                  i++;
                  setRoomDetails(Array.from(senderMap.values()));
                }
              }
            }
          });
          // // Make sure to return the cleanup function inside the loop
          // return () => messagesRef.off();
        }
      } catch (error) {
        console.error("Error fetching data from Gun.js:", error);
      }
    };
    fetchDataFromGun();
  }, [messages11]);

  const fetchDataFromGun = () => {
    try {
      for (const rId of messages11) {
        const messagesRef = gun.get(`MESSAGES${rId}`).map();
        messagesRef.once((data, key) => {
          if (data) {
            const { sender, avatar, content, timestamp, receiver } = data;
            if (data.sender) {
              if (data.sender == address) {
                senderMap.set(rId, {
                  sender,
                  avatar,
                  content,
                  timestamp,
                  receiver,
                });
                setRoomDetails(Array.from(senderMap.values()));
              }
            }
          }
        });
      }
    } catch (error) {
      console.error("Error fetching data from Gun.js:", error);
    }
  };

  // SIDEBAR MESSAGING SCREEN COMPONENT ENDS HERE

  // DEBUGGING LINE FOR SIDEBAR MESSAGING SCREEN
  // useEffect(() => {
  //   // console.log("KEYS ::::: ",messages11) ;
  //   console.log("ROOM DATA ::::: ", messageDetails);
  // });

  // MESSAGE BOX DATA

  useEffect(() => {
    if (roomId) {
      const messagesRef = gun.get(`MESSAGES${roomId}`);
      // console.log("ROOM ID :::: ", roomId);

      
      dispatch({ type: "CLEAR_MESSAGES" });

      messagesRef.map().on((m) => {
        if (localStorage.getItem("roomId") === roomId) {
          dispatch({
            type: "ADD_MESSAGE",
            message: {
              sender: m.sender,
              avatar: m.avatar,
              content: m.content,
              timestamp: m.timestamp,
            },
          });
        }
      });
    }
  }, [roomId]);

  // MESSAGE BOX DATA ENDS HERE

  useEffect(() => {
    const el = document.getElementById("scrollchat");
    if (el) el.scrollTop = el.scrollHeight;
  }, [state.messages]);

  // REMOVE DUPLICATE MESSGAES
  const newMessagesArray = () => {
    const formattedMessages = state.messages.filter((value, index) => {
      const _value = JSON.stringify(value);
      return (
        index ===
        state.messages.findIndex((obj) => {
          return JSON.stringify(obj) === _value;
        })
      );
    });

    return formattedMessages;
  };
  // REMOVE DUPLICATE MESSGAES ENDS HERE

  // SEND MESSAGE
  const [selectedFileIMG, setSelectedFileIMG] = useState(null);
  const [isImgmodel, setIsImgModel] = useState(false);
  const handleFileChangeIMG = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      // Event listener to handle file reading completion
      reader.addEventListener("load", (readerEvent) => {
        const base64String = readerEvent.target.result;
        console.log("Base64 encoded image:", base64String);
        setSelectedFileIMG(base64String);
        setIsImgModel(true);
      });

      // Read the file as base64
      reader.readAsDataURL(file);
    }
  };

  const sendMessage = () => {
    // console.log("sendMessage called");
    fetchDataFromLocalStorage();
    fetchDataFromGun();
    const messagesRef = gun.get(`MESSAGES${roomId}`);

    // Create message object
    const messageObject = {
      sender: address || "Default Value",
      avatar: `https://btxt.app/api2/profile-picture/${address}`,
      content: selectedFileIMG ? selectedFileIMG : messageText,
      timestamp: Date().substring(16, 21),
      receiver: roomIdUser,
    };

    // Save message to gunDB
    messagesRef.set(messageObject);

    // Reset selectedFileIMG after sending
    setSelectedFileIMG(null);
    setIsImgModel(false);
    setMessageText("");
  };
  // ENDS HERE

  // Helper function to get private key from selected address
  const getAddressPrivateKey = (address) => {
    const selectedAddressObj = alladd.find((item) => item.address === address);
    return selectedAddressObj ? selectedAddressObj.privateKey : "";
  };

  const getUtxo = async (senderAddress) => {
    // console.log("FUNCTION CALLED ::: ", senderAddress);
    try {
      const response = await axios.get(
        `https://btxt.app/api2/utxo/${senderAddress}`
      );
      setUtxo(response.data);
      console.log("RESPONSE ::: ", response.data);
    } catch (error) {
      console.error("Error fetching UTXO:", error);
    }
  };

  useEffect(() => {
    getUtxo(address);
  }, [address]);

  const verifyTransaction = async (txHASAH) => {
    try {
      const response = await axios.get(
        `https://btxt.app/api2/sendtransaction/${txHASAH}`
      );
      console.log(
        "Transaction verification:",
        JSON.stringify(response.data, null, 2)
      );
      setTransactionStatus(response.data.result);
    } catch (error) {
      console.error("Error verifying transaction:", error);
    }
  };

  const performTransactionBLOCX = async () => {
    try {
      const response = await axios.post("https://btxt.app/api2/transaction", {
        RAddress: address,
        tAddress: receiverAddress,
        pKey: getAddressPrivateKey(address), // Implement this function
        sAmount: parseFloat(ammount),
        txid: utxo.map((item) => item.txid),
        vout: utxo.map((item) => parseInt(item.vout)),
        vinamount: utxo.map((item) => parseInt(item.value)),
      });

      console.log("TRANSACTION HASH ::: ", response.data);

      setTransactionStatusS(response.data.txHashes);
      verifyTransaction(response.data.txHashes);

      if (response.data.success) setTranSuccess(true);
      else seterrorMessageTrans(true);

      setErrorMessage("");
    } catch (error) {
      console.error("Error performing transaction:", error);
      seterrorMessageTrans(true);
    }
  };

  const performTransactionETH = async () => {
    try {
      const response = await axios.post("https://btxt.app/api2/sendETH", {
        senderPrivateKey: ethPrivateKey,
        to: receiverAddress,
        amount: ammount,
      });
      alert("Transaction Successful !");
      console.log("TRANSACTION HASH ::: ", response);
      if (response.data.success) setTranSuccess(true);
      else seterrorMessageTrans(true);

      setErrorMessage("");
    } catch (error) {
      console.error("Error performing transaction:", error);
      seterrorMessageTrans(true);
    }
  };

  const performTransactionBSC = async () => {
    try {
      const response = await axios.post("https://btxt.app/api2/sendBSC", {
        senderPrivateKey: ethPrivateKey,
        to: receiverAddress,
        amount: ammount,
      });
      alert("Transaction Successful !");
      console.log("TRANSACTION HASH ::: ", response);

      if (response.data.success) setTranSuccess(true);
      else seterrorMessageTrans(true);

      setErrorMessage("");
    } catch (error) {
      console.error("Error performing transaction:", error);
      seterrorMessageTrans(true);
    }
  };

  // end transaction part

  // PIN FOR VALIDATION TRANSACTION STARTS HERE
  const [isModalOpenPIN, setIsModalOpenPIN] = useState(false);
  const [enteredPin, setEnteredPin] = useState("");
  const [shouldHandleTransaction, setShouldHandleTransaction] = useState(false);

  useEffect(() => {
    if (shouldHandleTransaction) {
      handleTransaction();
      setShouldHandleTransaction(false); // Reset the flag after handling the transaction
    }
  }, [shouldHandleTransaction]);

  const showModalPIN = () => {
    setIsModalOpenPIN(true);
  };
  // console.log("STATE : : : ", isModalOpenPIN)

  const hideModalPIN = () => {
    setIsModalOpenPIN(false);
    setEnteredPin("");
  };

  const handlePinSubmit = () => {
    const storedPin = localStorage.getItem("pin");
    if (enteredPin === storedPin) {
      if (selectedOption === "BLOCX Mainnet") {
        performTransactionBLOCX();
      } else if (selectedOption === "Ethereum Mainnet") {
        performTransactionETH();
      } else if (selectedOption === "Binance Smart Chain") {
        performTransactionBSC();
      } else {
        alert("Please select a valid chain");
      }
      hideModalPIN();
    } else {
      alert("Entered PIN is Wrong ");
    }
  };

  const handleTransaction = () => {
    if (selectedOption === "BLOCX Mainnet") {
      if (balance > ammount) {
        showModalPIN();
      } else {
        alert("Insufficient Funds");
      }
    } else if (selectedOption === "Ethereum Mainnet") {
      if (EthBalance > ammount) {
        showModalPIN();
      } else {
        alert("Insufficient Funds");
      }
    } else if (selectedOption === "Binance Smart Chain") {
      if (BscBalance > ammount) {
        showModalPIN();
      } else {
        alert("Insufficient Funds");
      }
    } else {
      alert("Please select a valid chain");
    }
  };

  const handleButtonClick = () => {
    setSelectedOption("BLOCX Mainnet");
    setShouldHandleTransaction(true);
  };

  // PIN FOR VALIDATION TRANSACTION ENDS HERE

  function splitContent(content) {
    const words = content.split(" ");
    const chunks = [];
    let chunk = "";
    for (let i = 0; i < words.length; i++) {
      if ((i + 1) % 18 === 0) {
        chunks.push(chunk.trim());
        chunk = "";
      }
      chunk += words[i] + " ";
    }
    if (chunk.trim() !== "") {
      chunks.push(chunk.trim());
    }
    return chunks;
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  }

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

 
  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  useEffect(() => {
    document.body.classList.toggle("light-theme", isDark);
  }, [isDark]);

  // CODE FOR GETTING THE TRANSACTION ACORDING TO ROOM ADDRESS
  useEffect(() => {
    fetch(
      `https://api-explorer.blocxscan.com/ext/getaddresstxs/${roomIdUser}/0/10`
    )
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) =>
        console.error("Error fetching transaction data:", error)
      );
  }, []);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      paddingTop: "0",
      padding: 10,
      display: "flex",
      alignItems: "center",
      WebkitBackdropFilter: "blur(10px)",
      backdropFilter: "blur(10px)",
      color: "#fff",
      borderBottom: "1px solid rgba(0, 69, 132, 0.5)",
      background:
        "linear-gradient(270deg, rgba(0, 69, 132, 0.2) 0%, rgba(5, 5, 5, 0.15) 100%) !important",
      boxShadow:
        "0px 4px 18px 0px rgba(0, 0, 0, 0.16), 0px 4px 100px 0px rgba(0, 0, 0, 0.25) inset !important",
    }),

    control: () => ({
      color: "#fff",
      height: "43px",
      display: "flex",
      borderRadius: "5px",
      border: "1px solid #1176ff",
      boxShadow: "0px 4px 18px 0px rgba(0, 0, 0, 0.16)",
      backdropFilter: "blur(20px)",
      backgroundColor: "rgba(99, 99, 99, 0) !important",
      WebkitBackdropFilter: "blur(20px)",
    }),
    singleValue: (provided) => ({
      ...provided,
      gridArea: "1 / 1 / 2 / 3",
      maxWidth: "100%",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      color: "#fff",
      marginLeft: "2px",
      marginRight: "2px",
      boxSizing: "border-box",
      marginLeft: "16px",
      background: "#000",
    }),
    optionLabel: () => ({
      display: "flex",
      alignItems: "center",
      border: "1px solid #1176ff",
      boxShadow: "0px 4px 18px 0px rgba(0, 0, 0, 0.16)",
      backdropFilter: "blur(20px)",

      WebkitBackdropFilter: "blur(20px)",
    }),
    optionImage: {
      width: "32px",
      height: "32px",
      marginRight: "10px",
      display: "flex",
      alignItems: "center",
      marginTop: "10px",
    },
  };

  const SingleValueComponent = ({ data, ...props }) => (
    <components.SingleValue {...props}>
      <img
        src={data.dataSrc}
        alt={data.label}
        style={customStyles.optionImage}
      />
      {data.label}
    </components.SingleValue>
  );

  const OptionComponent = ({ data, ...props }) => (
    <components.Option {...props}>
      <img
        src={data.dataSrc}
        alt={data.label}
        style={customStyles.optionImage}
      />
      {data.label}
    </components.Option>
  );

  function TransactionItem({ transaction }) {
    const txidShortened = transaction.txid.substring(0, 20) + "...";
    const amount =
      transaction.sent !== 0 ? transaction.sent : transaction.received;
    const colorClass = transaction.sent !== 0 ? "sent fs-14" : "received fs-14";
    const txidLink = `https://blocxscan.com/tx/${transaction.txid}`;

    return (
      <div className="d-flex justify-content-between">
        <span className="fs-14 text-white">
          <a
            style={{
              textDecoration: "none",
            }}
            href={txidLink}
          >
            {txidShortened}
          </a>
        </span>
        <span className={colorClass}>{amount}</span>
      </div>
    );
  }
  // ENDS HERE

  function copyAddressETH() {
    try {
      const addressSpan = document.getElementById("userEthAddress");
      const range = document.createRange();
      range.selectNode(addressSpan);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand("copy");
      window.getSelection().removeAllRanges();
      setCopySuccess(true);
      setErrorMessage("");
    } catch (error) {
      console.error("Error copying address:", error);
      setErrorMessagec("Failed to copy address");
      setCopySuccess(false);
    }
  }

  //code manushree
  const filteredRoomsGroup = group.filter((room) =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle clicking outside the dropdown to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const dropdownStyles = {
    position: "absolute",
    width: "100%",
    top: "98%", 
    left: 0,
    zIndex: 1000,
    WebkitBackdropFilter: "blur(10px)",
    backdropFilter: "blur(10px)",

    border: "1px solid rgba(0, 69, 132, 0.5)",
    // background: 'linear-gradient(270deg, rgba(0, 69, 132, 0.2) 0%, rgba(5, 5, 5, 0.15) 100%)',
    boxShadow:
      "0px 4px 18px 0px rgba(0, 0, 0, 0.16), 0px 4px 100px 0px rgba(0, 0, 0, 0.25) inset",
    background: "none",
  };

  const dropdownitems = {
    borderBottom: "1px solid",
    padding: "8px",
    color: "#fff",
    WebkitBackdropFilter: "blur(10px)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(0, 69, 132, 0.5)",
    boxShadow:
      "0px 4px 18px 0px rgba(0, 0, 0, 0.16), 0px 4px 100px 0px rgba(0, 0, 0, 0.25) inset",
  };

  function copyVisibleAddress() {
    try {
      const addressSpan = document.getElementById("visibleAddress");
      const range = document.createRange();
      range.selectNode(addressSpan);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand("copy");
      window.getSelection().removeAllRanges();
      setCopySuccess(true);
      setErrorMessage("");
    } catch (error) {
      console.error("Error copying address:", error);
      setErrorMessagec("Failed to copy address");
      setCopySuccess(false);
    }
  }

  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => {
        setCopySuccess(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [copySuccess]);

  const handleCreateGroup = (selectedRooms) => {
    // Open your group creation modal here
    // You can pass the selectedRooms to the modal for further processing
    const modal = new bootstrap.Modal(document.getElementById('idGroupModel'));
    modal.show();
  };

// Define the addUserToGroup function
const addUserToGroup = (groupId, userId) => {
  const groupRef = gun.get(`GROUP${groupId}`);
  const userRef = gun.get(`USER${userId}`);

  // Add user to group
  groupRef.get('members').get(userId).put(true);

  // Add group to user's groups
  userRef.get('groups').get(groupId).put(true);

  // Ensure the changes are synced
  gun.get('GROUPMEMBERS').get(groupId).get(userId).put(true);
};


  function addGroupChat(groupId) {
    checkGroupMembership(groupId, address, (isMember) => {
      if (isMember) {
        setRoomId(groupId);
        setRoomIdUser(groupId);
        setIsDropdownVisible(false);
        setSearchQuery('');  // Clear the search query
      } else {
        console.log("You are not a member of this group");
        alert("You are not authorized to join this group.");
      }
    });
  }

  function checkGroupMembership(groupId, userId, callback) {
    const groupRef = gun.get(`GROUP${groupId}`);
    groupRef.get('members').get(userId).once((isMember) => {
      callback(isMember === true);
    });
  }
  
 
 

  

  useEffect(() => {
    if (searchQuery) {
      const filteredGroups = availableGroups.filter(group => 
        group.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRoomsGroup(filteredGroups);
    } else {
      setFilteredRoomsGroup([]);
    }
  }, [searchQuery, availableGroups]);

 
 

  

 
  return (
    <>
      <div
        className={`container-fluid overflow-hidden messageing_main p-0 ${
          isDark ? "light-theme" : " dark-theme"
        }`}
      >
        <div className="row g-0">
          <div
            className={`col-md-3 ps-md-0 messaeing_left pe-0 ${
              isDark ? " light-theme " : "dark-theme"
            }`}
          >
            <div className="profil_sec pe-lg-4 pt-0 p-2">
              {/* <RoomSearch/> */}
              <div className="row">
                <div className="col-2 p-lg-2 p-0 d-flex justify-content-center align-items-center">
                  <div className="img" onClick={() => setShowModal(true)}>
                    <img
                      className="img-fluid pro_img"
                      style={{
                        borderRadius: proisDynamic ? "0%" : "50%",
                      }}
                      src={proPic}
                      alt="Profile"
                    />
                    <span className="plus_icon">
                      <svg
                        viewBox="0 0 24 24"
                        height="12"
                        width="12"
                        preserveAspectRatio="xMidYMid meet"
                        className=""
                        fill="none"
                      >
                        <title>Add New Profile Picture</title>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M20.5 13.2501L20.5 10.7501L13.25 10.7501L13.25 3.5L10.75 3.5L10.75 10.7501L3.5 10.7501L3.5 13.2501L10.75 13.2501L10.75 20.5L13.25 20.5L13.25 13.2501L20.5 13.2501Z"
                          fill="#fff"
                        ></path>
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Bootstrap Modal */}
                {showModal && (
                  <div
                    className="modal fade show "
                    style={{ display: "block" }}
                  >
                    <div className="modal-dialog modal-dialog-centered ">
                      <div className="modal-content profile_img_model">
                        <div className="modal-header">
                          <h5 className="modal-title text-white">
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
                            style={{
                              maxHeight: "100px",
                              maxWidth: "100px",
                              margin: "auto",
                              display: "flex",
                            }}
                          />
                          <input
                            style={{ background: "#0084ff", marginTop: "5px" }}
                            type="file"
                            onChange={handleFileChange}
                            accept=".png,.jpg,.jpeg"
                          />
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
                )}
                {/* End Bootstrap Modal */}

                {/*QR Scan Bootstrap Modal */}

                <div
                  className="modal fade"
                  id="qrModal"
                  tabIndex="-1"
                  aria-labelledby="qrModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered ">
                    <div className="modal-content profile_img_model">
                      <div className="modal-header">
                        <h5 className="modal-title" id="qrModalLabel">
                          {roomIdUser} QR Code
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div
                        className="modal-body"
                        style={{ margin: "auto", display: "flex" }}
                      >
                        <div className="">
                          <QRCode
                            value={roomIdUser}
                            style={{ width: "300px", height: "300px" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* End Bootstrap Modal */}

                <div className="col-7 d-flex  align-items-center p-lg-0">
                  {/* <p className='mb-1'>Serina Paul</p> */}
                  <small className="mb-0 fs_6">{address}</small>
                </div>
                <div className="col-3 pe-lg-2 pe-0 d-flex justify-content-center align-items-center">
                  <div className="icon_img">
                    <div>
                      {/* <div className="pe-2">
                        <img type="button" src={Vector} alt="" />
                      </div> */}
                      <button
                        type="button"
                        className="px-2 border-0 p-0 btn"
                        onClick={toggleTheme}
                      >
                        <div className="theme-control-toggle">
                          <div className="theme-control-toggle-label">
                            {isDark ? (
                              <svg
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-sun"
                              >
                                <g>
                                  <circle cx="12" cy="12" r="5"></circle>
                                  <line x1="12" y1="1" x2="12" y2="3"></line>
                                  <line x1="12" y1="21" x2="12" y2="23"></line>
                                  <line
                                    x1="4.22"
                                    y1="4.22"
                                    x2="5.64"
                                    y2="5.64"
                                  ></line>
                                  <line
                                    x1="18.36"
                                    y1="18.36"
                                    x2="19.78"
                                    y2="19.78"
                                  ></line>
                                  <line x1="1" y1="12" x2="3" y2="12"></line>
                                  <line x1="21" y1="12" x2="23" y2="12"></line>
                                  <line
                                    x1="4.22"
                                    y1="19.78"
                                    x2="5.64"
                                    y2="18.36"
                                  ></line>
                                  <line
                                    x1="18.36"
                                    y1="5.64"
                                    x2="19.78"
                                    y2="4.22"
                                  ></line>
                                </g>
                              </svg>
                            ) : (
                              <svg
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-moon"
                              >
                                <g>
                                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                </g>
                              </svg>
                            )}
                          </div>
                        </div>
                      </button>
                    </div>

                    <div>
                      <a
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasLeft"
                        aria-controls="offcanvasLeft"
                      >
                        {isDark ? (
                          <img src={darkwalletImg} alt="" />
                        ) : (
                          <img src={lightwalletImg} alt="" />
                        )}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" mt-3 searchbar">
                <form>
                  {/* <InputGroup className="mb-3">
                    <input
                      className={`form-control s_r_input  ${isDark ? " light-theme " : "dark-theme"
                        }`}
                      autoComplete="off"
                      name="roomId"
                      placeholder="Search"
                      aria-describedby="basic-addon2"
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}

                    />
                    
                    <InputGroup.Text
                      className={`s_r_icon ${isDark ? "dark-theme" : "light-theme"
                        }`}
                      id="basic-addon2"
                    >
                      {isDark ? (
                        <img className="" src={darkSearchImg} alt="" />
                      ) : (
                        <img className="" src={lightSearchImg} alt="" />
                      )}
                    </InputGroup.Text>
                  </InputGroup> */}
                  {/* <RoomSearch value={searchQuery} onChange={handleChangeInput} /> */}

                  <InputGroup className="mb-3">
                    <input
                      type="text"
                      className={`form-control s_r_input ${
                        isDark ? "light-theme" : "dark-theme"
                      }`}
                      autoComplete="off"
                      aria-describedby="basic-addon2"
                      placeholder="Search"
                      value={searchQuery}
                      onChange={handleChangeInput}
                    />

                    <InputGroup.Text
                      className={`s_r_icon ${
                        isDark ? "dark-theme" : "light-theme"
                      }`}
                      id="basic-addon2"
                    >
                      {isDark ? (
                        <img className="" src={darkSearchImg} alt="" />
                      ) : (
                        <img className="" src={lightSearchImg} alt="" />
                      )}
                    </InputGroup.Text>
                    {searchQuery && isDropdownVisible && (
                      <Dropdown.Menu
                        show
                        style={dropdownStyles}
                        className={`w-100 py-0 ${
                          isDark ? "dark-theme" : "light-theme"
                        }`}
                      >
                        {filteredRoomsGroup.map((room) => (
                          <Dropdown.Item
                            key={room._id}
                            className="d-flex align-items-center groupinputclass"
                            style={dropdownitems}
                            onClick={() => addGroupChat(room.name)}
                          >
                            <img
                              src={`https://btxt.app/api2/profile-picture/${room.name}`}
                              alt="ram"
                              style={{
                                width: "20px",
                                height: "20px",
                                marginRight: "10px",
                              }}
                            />
                            {room.name}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    )}
                  </InputGroup>
                </form>
              </div>

              <hr className=" mb-3" />

              <div className="d-flex justify-content-between">
                <h2 className="mb-4">Messages</h2>{" "}
              
     
                <div className="d-flex">
                  <div
                    className="pe-2"
                    role="button"
                    data-bs-toggle="modal"
                    data-bs-target="#idcallModal"
                  >
  
                    {isDark ? (
                      <img src={svg4} alt="" />
                    ) : (
                      <img src={Vector} alt="" />
                    )}
                   
                  </div>
                  {/* <div
                    className="pe-2"
                    data-bs-toggle="modal"
                    data-bs-target="#idGroupModel"
                  >
                    
                    {isDark ? (
                      
                      <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="black" d="M22 9V7h-2v2h-2v2h2v2h2v-2h2V9zM8 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0-6c1.1 0 2 .9 2 2s-.9 2-2 2s-2-.9-2-2s.9-2 2-2m0 7c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4m6 5H2v-.99C2.2 16.29 5.3 15 8 15s5.8 1.29 6 2zM12.51 4.05C13.43 5.11 14 6.49 14 8s-.57 2.89-1.49 3.95C14.47 11.7 16 10.04 16 8s-1.53-3.7-3.49-3.95m4.02 9.78C17.42 14.66 18 15.7 18 17v3h2v-3c0-1.45-1.59-2.51-3.47-3.17"/></svg>
                    ) : (
                      
                     
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="2em"
                        height="2em"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="white"
                          d="M12.5 11.95q.725-.8 1.113-1.825T14 8t-.387-2.125T12.5 4.05q1.5.2 2.5 1.325T16 8t-1 2.625t-2.5 1.325M18 20v-3q0-.9-.4-1.713t-1.05-1.437q1.275.45 2.363 1.163T20 17v3zm2-7v-2h-2V9h2V7h2v2h2v2h-2v2zM8 12q-1.65 0-2.825-1.175T4 8t1.175-2.825T8 4t2.825 1.175T12 8t-1.175 2.825T8 12m-8 8v-2.8q0-.85.438-1.562T1.6 14.55q1.55-.775 3.15-1.162T8 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T16 17.2V20zm8-10q.825 0 1.413-.587T10 8t-.587-1.412T8 6t-1.412.588T6 8t.588 1.413T8 10m-6 8h12v-.8q0-.275-.137-.5t-.363-.35q-1.35-.675-2.725-1.012T8 15t-2.775.338T2.5 16.35q-.225.125-.363.35T2 17.2zm6 0"
                        />
                      </svg>
                    )}
                   
                  </div> */}

                  <div
  className="pe-2 position-relative pointer"
  role="button"
  onClick={() => setIsSelectionMode(!isSelectionMode)}
>
  {isDark ? (
    isSelectionMode ? (
      <HiUserGroup style={{fontSize:'24px'}} />
    ) : (
      <MdGroupAdd style={{fontSize:'24px'}} />
    )
  ) : (
  
    <MdGroupAdd style={{fontSize:'24px'}} />
  )}
  <div className="adduser">
    {isSelectionMode && <p className="mb-0">  {selectedRooms.length}</p>}
  </div>

</div>
                </div>
        
              </div>

   

              {/* id call model */}
              <div
                className="modal fade"
                id="idcallModal"
                tabIndex="-1"
                aria-labelledby="idcallModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered ">
                  <div className="modal-content profile_img_model">
                    <div className="modal-header">
                      <h5 className="modal-title" id="idcallModalLabel">
                        Add New Chat
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div
                      className="modal-body"
                      style={{ margin: "auto", display: "flex" }}
                    >
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          setRoomId(
                            generateSharedRoomId(
                              address,
                              e.target.elements.receiver.value
                            )
                          );
                          setRoomIdUser(e.target.elements.receiver.value);
                        }}
                      >
                        <InputGroup className="mb-3">
                          <input
                            className={`form-control connecet_input   ${
                              isDark ? " light-theme " : "dark-theme"
                            }`}
                            autoComplete="off"
                            name="roomId"
                            placeholder="Search"
                            aria-describedby="basic-addon2"
                            type="text"
                          />

                          <button
                            className="connect_btn"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={(e) => {
                              e.preventDefault();
                              const inputValue =
                                e.currentTarget.previousSibling.value;
                              if (inputValue) {
                                setRoomId(
                                  generateSharedRoomId(address, inputValue)
                                );
                                setRoomIdUser(inputValue);
                              }
                            }}
                          >
                            Connect
                          </button>
                        </InputGroup>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

          
              <div
                className="modal fade"
                id="idGroupModel"
                tabIndex="-1"
                aria-labelledby="idGroupModelLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content profile_img_model">
                    <div className="modal-header">
                      <h5 className="modal-title" id="idGroupModelLabel">
                        Create New Group
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div
                      className="modal-body"
                      style={{
                        margin: "auto",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <p>Selected Rooms: {selectedRooms.length}</p>
                      <form onSubmit={handleSubmitGroup}>
                        <div className="d-flex">
                        <div
                        className="me-3"
                          style={{ position: "relative", cursor: "pointer" }}
                          onClick={() =>
                            document.getElementById("fileInput").click()
                          }
                        >
                          <img
                            className="image-fluid"
                            src={proPicGroup}
                            alt="Profile"
                            style={{
                              maxHeight: "72px",
                              maxWidth: "72px",
                              margin: "auto",
                              display: "flex",
                            }}
                          />
                          <input
                            id="fileInput"
                            style={{ display: "none" }}
                            type="file"
                            onChange={handleGroupChange}
                            accept=".png,.jpg,.jpeg"
                          />
                        </div>
                        
                        <InputGroup className="">
                          <input
                            className={`form-control connecet_input ${
                              isDark ? "light-theme" : "dark-theme"
                            }`}
                            autoComplete="off"
                            name="groupID"
                            placeholder="Group name"
                            aria-describedby="basic-addon2"
                            type="text"
                          />
                        </InputGroup>
                        </div>
                      
                        <InputGroup className="mb-3">
                          <input
                            className={`form-control connecet_input ${
                              isDark ? "light-theme" : "dark-theme"
                            }`}
                            autoComplete="off"
                            name="channelDescription"
                            placeholder="Description (optional)"
                            aria-describedby="basic-addon2"
                            type="text"
                          />
                        </InputGroup>
                        <div className="d-flex justify-content-end">
                          <button
                            className="btn  me-2"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            type="button"
                            style={{background:'linear-gradient(#141414 20%, #050505 100%) padding-box, linear-gradient(360deg, #00458430 0%, #e3e3e360 100%) border-box',color:'#fff'}}
                          >
                            Cancel
                          </button>
                          <button
                            className="btn "
                            style={{background:' linear-gradient(62deg, #0d6efd 40%, #0505053b 100%)',color:'#fff'}}
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            type="submit"
                          >
                            Create
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              {/* Model for cretion of group ends here */}

              {/* {filteredRooms.map((room, i) => (
                <div
                  onClick={() => {
                    if (room.receiver.length > 20) {
                      setRoomId(generateSharedRoomId(address, room.receiver));
                    } else {
                      setRoomId(room.receiver);
                    }
                    setRoomIdUser(room.receiver);
                    handleShow(); // Show the offcanvas
                    const element = document.getElementById(`room_${i}`);
                    if (element) {
                      const rect = element.getBoundingClientRect();
                      if (
                        rect.top < 0 ||
                        rect.bottom >
                          (window.innerHeight ||
                            document.documentElement.clientHeight)
                      ) {
                        element.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                      }
                    }
                  }}
                  style={{ cursor: "pointer" }}
                  id={`room_${i}`}
                  key={i}
                  className="row chat_active align-items-center d-flex"
                >
                  <div className="col-2 p-lg-2 p-0 d-flex justify-content-center align-items-center">
                    <NavLink className="img">
                      <img
                        className="img-fluid pro_img"
                        style={{ borderRadius: "50px" }}
                        src={`https://btxt.app/api2/profile-picture/${room.receiver}`}
                        alt="Profile"
                      />
                    </NavLink>
                  </div>
                  <div className="col-10 ps-0">
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="mb-1 fs_6 ps-0">
                        {room.receiver || "Unknown Sender"}
                      </small>
                      <span className="mb-0 fs_6">
                        {room.timestamp || "Unknown Timestamp"}
                      </span>
                    </div>
                    <div>
                      {room.content.startsWith("data:image") ? (
                        // Display as image if it's an image message
                        <p className="mb-0 fs-14 last_message">
                          New Image{" "}
                          <img
                            height="15px"
                            width="15px"
                            src={room.content}
                            alt="message"
                          />
                        </p>
                      ) : (
                        // Display as text if it's a text message
                        <p className="mb-0 fs-14 last_message">
                          {room.content.split("</br>")[0] ||
                            "No content available"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

{selectedRooms.length > 0 && (
  <button
    className="btn btn-primary mt-3"
    onClick={() => handleCreateGroup(RoomId)}
  >
    Create Group with Selected Rooms ({RoomId.length})
  </button>
)} */}



<div>
{filteredRooms.map((room, i) => (
  <div
    onClick={() => {
      if (isSelectionMode) {
        const roomId = room.receiver.length > 20
          ? generateSharedRoomId(address, room.receiver)
          : room.receiver;

        setSelectedRooms(prevSelected => {
          if (prevSelected.includes(roomId)) {
            return prevSelected.filter(id => id !== roomId);
          } else {
            return [...prevSelected, roomId];
          }
        });
      } else {
        if (room.receiver.length > 20) {
          setRoomId(generateSharedRoomId(address, room.receiver));
        } else {
          setRoomId(room.receiver);
        }
        setRoomIdUser(room.receiver);
        handleShow();
        const element = document.getElementById(`room_${i}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (
            rect.top < 0 ||
            rect.bottom > (window.innerHeight || document.documentElement.clientHeight)
          ) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }
      }
    }}
    style={{ cursor: "pointer" }}
    id={`room_${i}`}
    key={i}
    className={`row chat_active align-items-center d-flex ${
      isSelectionMode && selectedRooms.includes(room.receiver.length > 20
        ? generateSharedRoomId(address, room.receiver)
        : room.receiver
      ) ? 'selected-room' : ''
    }`}
  >
    <div className="col-2 p-lg-2 p-0 d-flex justify-content-center align-items-center">
      <NavLink className="img">
        <img
          className="img-fluid pro_img"
          style={{ borderRadius: "50px" }}
          src={`https://btxt.app/api2/profile-picture/${room.receiver}`}
          alt="Profile"
        />
      </NavLink>
    </div>
    <div className="col-10 ps-0">
      <div className="d-flex justify-content-between align-items-center">
        <small className="mb-1 fs_6 ps-0">
          {room.receiver || "Unknown Sender"}
        </small>
        <span className="mb-0 fs_6">
          {room.timestamp || "Unknown Timestamp"}
        </span>
      </div>
      <div>
        {room.content.startsWith("data:image") ? (
          <p className="mb-0 fs-14 last_message">
            New Image{" "}
            <img
              height="15px"
              width="15px"
              src={room.content}
              alt="message"
            />
          </p>
        ) : (
          <p className="mb-0 fs-14 last_message">
            {room.content.split("</br>")[0] ||
              "No content available"}
          </p>
        )}
      </div>
    </div>
  </div>
))}





{filteredGroups.map((group, i) => (
  <div
    onClick={() => {
      if (!isSelectionMode) {
        setRoomId(group.id);
        setRoomIdUser(group.id);
        handleShow();
        const element = document.getElementById(`group_${i}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (
            rect.top < 0 ||
            rect.bottom > (window.innerHeight || document.documentElement.clientHeight)
          ) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }
      }
    }}
    style={{ cursor: "pointer" }}
    id={`group_${i}`}
    key={i}
    className={`row chat_active align-items-center d-flex ${
      !isSelectionMode ? '' : 'non-selectable'
    }`}
  >
    <div className="col-2 p-lg-2 p-0 d-flex justify-content-center align-items-center">
      <NavLink className="img">
        <img
          className="img-fluid pro_img"
          style={{ borderRadius: "50px" }}
          src={`https://btxt.app/api2/profile-picture/${group.id}`}
          alt="Group Profile"
        />
      </NavLink>
    </div>
    <div className="col-10 ps-0">
      <div className="d-flex justify-content-between align-items-center">
        <small className="mb-1 fs_6 ps-0">
          {group.name || "Unknown Group"}
        </small>
        <span className="mb-0 fs_6">
          {group.timestamp || "Unknown Timestamp"}
        </span>
      </div>
      <div>
        {group.content && group.content.startsWith("data:image") ? (
          <p className="mb-0 fs-14 last_message">
            New Image{" "}
            <img
              height="15px"
              width="15px"
              src={group.content}
              alt="message"
            />
          </p>
        ) : (
          <p className="mb-0 fs-14 last_message">
            {group.content?.split("</br>")[0] || "No content available"}
          </p>
        )}
      </div>
      <div className="mt-2">
        <strong>Members:</strong>
        <ul className="list-unstyled">
          {group.members.map((member, index) => (
            <li key={index}>
              <img
                className="img-fluid pro_img"
                style={{ borderRadius: "50px", width: "25px", marginRight: "5px" }}
                src={`https://btxt.app/api2/profile-picture/${member}`}
                alt="Member Profile"
              />
              {member}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
))}





  </div>

{isSelectionMode && selectedRooms.length > 0 && (
  <button
    className="btn btn-primary mt-3"
    onClick={() => handleCreateGroup(selectedRooms)}
  >
    Create Group with Selected Rooms ({selectedRooms.length})
  </button>
)}
            </div>
          </div>

          <div className="col-md-9 ps-0 ">
            <div className=" pt-0 ">
              <div className="row top_row">
                <div className="col-md-4 p-2 d-flex justify-content-start align-items-center ">
                  <div className="img me-2 p-2">
                    {roomIdUser != "" && (
                      <img
                        className="img-fluid pro_img"
                        style={{
                          width: "40px",
                          borderRadius: isDynamic ? "0%" : "50%",
                        }}
                        src={userproPic}
                        alt="Profile"
                      />
                    )}
                  </div>
                  <small className="mb-1 ps-0 text-white">{roomIdUser}</small>
                </div>

                <div className="col-md-8 p-2 pe-0 d-flex justify-content-end align-items-center room_input  ">
                  <div className="  d-flex justify-content-end align-items-center me-lg-5 me-3">
                    <div className="call_ic">
                      <VideoCall />
                    </div>

                    <NavLink
                      type="button"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasRight"
                      aria-controls="offcanvasRight"
                    >
                      <span className="info_icon">
                        <img className="w-100" src={info} />
                      </span>
                    </NavLink>
                  </div>
                </div>
                <div className="col-md-12 position-relative chat_main ">
                  <div className="overlay-container">
                    <img
                      src={svg1}
                      alt="svg1"
                      className="background-svg"
                      style={{ overflow: "hidden" }}
                    />
                    <img
                      src={svg2}
                      alt="svg2"
                      className="background-svg"
                      style={{ overflow: "hidden" }}
                    />
                    <img
                      src={svg3}
                      alt="svg3"
                      className="background-svg"
                      style={{ overflow: "hidden" }}
                    />
                  </div>

                  {/* THIS IS THE MESSAGES */}
                  <div className="chat_text2 ">
                    <div className="chat_text" id="scrollchat">
                      <div className="messages">
                        <ul className="mess_ul">
                          {newMessagesArray()
                            .reverse()
                            .map((msg, index) => (
                              <div
                                className="w-100 message-container"
                                style={{ display: "table" }}
                                key={index}
                              >
                                <div>
                                  <li
                                    key={index}
                                    className={`message ${
                                      msg.sender === address
                                        ? "outgoing"
                                        : "incoming"
                                    }`}
                                    style={{ display: "table-cell" }}
                                  >
                                    <img alt="avatar" src={msg.avatar} />
                                    <span>{msg.sender}</span>
                                    <div>
                                      {msg && msg.content ? (
                                        (() => {
                                          if (
                                            msg.content.startsWith("data:image")
                                          ) {
                                            // Render image message
                                            return (
                                              <div className="position-relative my-2 img_mo_div">
                                                <img
                                                  src={msg.content}
                                                  alt="message"
                                                  style={{
                                                    width: "100%",
                                                    height: "200px",
                                                  }}
                                                />
                                                <div className="img_overflow"></div>
                                                <a
                                                  className="download"
                                                  href={msg.content}
                                                  download="image"
                                                >
                                                  Download
                                                </a>
                                              </div>
                                            );
                                          } else if (
                                            msg.content.startsWith("data:video")
                                          ) {
                                            // Render video message
                                            return (
                                              <div className="position-relative my-2 img_mo_div">
                                                <video
                                                  style={{
                                                    width: "100%",
                                                    height: "200px",
                                                  }}
                                                  controls
                                                >
                                                  <source
                                                    src={msg.content}
                                                    type="video/mp4"
                                                  />
                                                  Your browser does not support
                                                  the video tag.
                                                </video>
                                                <div className="img_overflow"></div>
                                                <a
                                                  className="download"
                                                  href={msg.content}
                                                  download="video"
                                                >
                                                  Download
                                                </a>
                                              </div>
                                            );
                                          } else {
                                            // Render text message
                                            return (
                                              <div>
                                                {splitContent(msg.content).map(
                                                  (chunk, i) => (
                                                    <p
                                                      className="message_p"
                                                      key={i}
                                                      dangerouslySetInnerHTML={{
                                                        __html: chunk,
                                                      }}
                                                    ></p>
                                                  )
                                                )}
                                              </div>
                                            );
                                          }
                                        })()
                                      ) : (
                                        // Fallback UI if msg or msg.content is undefined
                                        <div className="error-message">
                                          Message content is not available
                                        </div>
                                      )}
                                      <span>{msg.timestamp}</span>
                                    </div>
                                  </li>
                                </div>
                              </div>
                            ))}
                        </ul>
                      </div>

                      <div className="input-box1">
                        {/* SEND FILE */}
                        <div className="two_icon_1" role="button">
                          <label htmlFor="fileInput" className="smile pe-1">
                            <img role="button" src={attch} />
                          </label>
                          <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleFileChangeIMG}
                          />
                        </div>
                        {/* SEND FILE ENDS HERE */}

                        <div className="two_icon">
                          <span className="smile pe-1 " type="button">
                            <img src={smile} />
                          </span>
                        </div>
                        <InputEmoji
                          className={`form-control chat_input py-3${
                            isDark ? "dark-theme" : "light-theme"
                          }`}
                          style={{ paddingLeft: "75px" }}
                          placeholder="Type a message..."
                          onChange={setMessageText}
                          onKeyPress={handleKeyPress}
                          value={messageText}
                          cleanOnEnter
                          onEnter={sendMessage}
                          keepOpened
                          shouldReturn
                          theme="auto"
                        />

                        <span
                          type="button"
                          className="input-group-addon chat_addon"
                          onClick={sendMessage}
                        >
                          <box-icon name="send"></box-icon>
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* ENDS HERE */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="offcanvas offcanvas-end"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel" className="m-auto">
            <div className="d-flex justify-center">
              <img src={logo} className="logo-icon"></img>
            </div>
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="right_part  p-0 text-center">
            <hr className="mb-3 text-white" />

            <div>
              <div className="img me-2 p-2">
                <img
                  className="img-fluid  w-25"
                  style={{
                    borderRadius: isDynamic ? "0%" : "50%", 
                  }}
                  src={userproPic}
                  alt="Profile"
                />
              </div>
              <p className="mb-1 text-white ps-0">{roomIdUser}</p>
            </div>

            <hr className="mb-3 text-white" />

            <div>
              <h4 className="mb-3 text-white">Last Transactions</h4>
              {transactions.map((transaction) => (
                <TransactionItem
                  key={transaction.txid}
                  transaction={transaction}
                />
              ))}
            </div>

            <hr className="mb-3 text-white" />

            <div
              className="d-flex justify-content-between px-2 p-1 mb-1 shadow-sm"
              style={{ backgroundColor: "#26272D" }}
              data-bs-toggle="modal"
              data-bs-target="#qrModal"
            >
              {/* <QRCode value={roomIdUser} /> */}
              <div>
                <img className="img-fluid" src={qr_scan} alt="" />
                <span className="fs-11 ps-1 text-white">QR Code </span>
              </div>
              <div>
                <img className="img-fluid" src={right_arrow} alt="" />
              </div>
            </div>
            <hr className="mb-1 text-white" />
            <div className="">
              <div className=" h-100">
                <div className="send-body">
                  <div className="row">
                    <h4 className="text-white mb-4 mt-0">Send Coin (BLOCX)</h4>
                    <div className="form-group col-12 mb-3">
                   
                      <div>
                      </div>
                    </div>
                    <div className="form-group col-12 mb-3">
                      <div className="input-group address_input">
                      </div>
                    </div>
                    <div className="form-group col-12 mb-3">
                      <input
                        type="number"
                        className="form-control "
                        value={ammount}
                        onChange={(e) => {
                          setAmmount(e.target.value);
                        }}
                        placeholder="Enter Amount"
                      />
                    </div>
                    <div className="col-12">
                      <button
                        className="icon-primary text-white w-100 m-0 p-2"
                        onClick={handleButtonClick}
                      >
                        SEND
                      </button>
                    </div>
                    <div className="col-12">
                      {transactionStatusS && (
                        <p className="text-white">
                          Transaction Status:{" "}
                          {transactionStatus ? "Successful" : "Failed"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* left side off canvas */}

      <div
        className="offcanvas offcanvas-start"
        id="offcanvasLeft"
        aria-labelledby="offcanvasLeftLabel"
      >
        <div className="offcanvas-header pb-0">
          <h5 id="offcanvasLeftLabel" className="m-auto">
            <div className="d-flex justify-center">
              <img src={logo} className="logo-icon"></img>
            </div>{" "}
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <hr className="mb-1 text-white" />
          <div className="right_part p-lg-3 p-0 text-center">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Select
                  value={selectedOption}
                  onChange={handleChange}
                  options={options}
                  styles={customStyles}
                  placeholder={selectedOption}
                  components={{
                    Option: OptionComponent,
                    SingleValue: SingleValueComponent,
                  }}
                />
              </li>
            </ul>

            <div className="small-card custPT overflow-visible">
              {selectedOption === "BLOCX Mainnet" && (
                <div className="row">
                  <div className="col-md-6 col-12 v1">
                    <h3 className="cardh w-break text-white">
                      {balance}
                      <span className="f-13"></span>
                    </h3>
                    <h3 className="cardb">BLOCX</h3>
                  </div>
                  <div className="col-md-6 col-12">
                    <h3 className="cardh w-break text-white">
                      {" "}
                      {usd * balance}
                      <span className="f-13"></span>{" "}
                    </h3>
                    <h3 className="cardb">USD</h3>
                  </div>
                </div>
              )}
              {selectedOption === "Ethereum Mainnet" && (
                <div className="row">
                  <div className="col-md-6 col-12 v1">
                    <h3 className="cardh w-break text-white">
                      {EthBalance}
                      <span className="f-13"></span>
                    </h3>
                    <h3 className="cardb">ETH</h3>
                  </div>
                  <div className="col-md-6 col-12">
                    <h3 className="cardh w-break text-white">
                      {" "}
                      {EthBalance * ethusd}
                      <span className="f-13"></span>{" "}
                    </h3>
                    <h3 className="cardb">USD</h3>
                  </div>
                </div>
              )}
              {selectedOption === "Binance Smart Chain" && (
                <div className="row">
                  <div className="col-md-6 col-12 v1">
                    <h3 className="cardh w-break text-white">
                      {BscBalance}
                      <span className="f-13"></span>
                    </h3>
                    <h3 className="cardb">BSC</h3>
                  </div>
                  <div className="col-md-6 col-12">
                    <h3 className="cardh w-break text-white">
                      {" "}
                      {BscBalance * bscusd}
                      <span className="f-13"></span>{" "}
                    </h3>
                    <h3 className="cardb">USD</h3>
                  </div>
                </div>
              )}
            </div>

            <hr className="mb-3 text-white" />

            <div className=" h-100">
              {selectedOption === "BLOCX Mainnet" && (
                <div className="receive-body">
                  <div className="row">
                    <div className="col-md-4 col-12 mb-3   cust-center my-auto col-xl-5 col-lg-5">
                      <div>
                        <QRCode
                          className="mt-3"
                          value={alladd[currentAddressIndex]?.address}
                        />
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>
                          <button
                            className="icon-primary text-white"
                            onClick={() => handleGenerateAddress("prev")}
                            disabled={currentAddressIndex === 0}
                          >
                            <i
                              className="f-25 bx bx-left-arrow-alt"
                              title="Previous Address"
                            ></i>
                          </button>
                        </span>
                        <span>
                          <button
                            className="icon-primary text-white"
                            onClick={() => handleGenerateAddress("next")}
                            disabled={currentAddressIndex === alladd.length - 1}
                          >
                            <i
                              className="f-25 bx bx-right-arrow-alt"
                              title="Next Address"
                            ></i>
                          </button>
                        </span>
                      </div>
                    </div>
                    <div className="col-md-8 col-12 mb-3 col-xl-7 col-lg-7">
                      <p className="rc-txt mb-3">
                        Scan the QR code or copy the address to receive coin.
                      </p>
                      <div className="input-group address_input">
                        <span
                          className="form-control text-truncate text-center bordernone"
                          id="visibleAddress"
                        >
                          {alladd[currentAddressIndex]?.address}
                        </span>
                        <div className="input-group-append bordernone">
                          <button
                            className="input-group-text"
                            onClick={copyVisibleAddress}
                          >
                            <i className="bx bx-copy" title="Copy Address"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      {errorMessagec && (
                        <Alert
                          variant="danger"
                          className="m-0"
                          onClose={() => setErrorMessagec("")}
                          dismissible
                        >
                          {errorMessagec}
                        </Alert>
                      )}
                      {copySuccess && (
                        <Alert
                          variant="success"
                          className="m-0"
                          onClose={() => setCopySuccess(false)}
                          dismissible
                        >
                          Address Copied
                        </Alert>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {selectedOption === "Ethereum Mainnet" && (
                <div className="receive-body">
                  <div className="row">
                    <div className="col-md-4 col-12 mb-3 d-flex justify-content-center cust-center my-auto col-xl-5 col-lg-5">
                      <div>
                        <QRCode value={userEthAddress} />
                      </div>
                    </div>
                    <div className="col-md-8 col-12 mb-3 col-xl-7 col-lg-7">
                      <p className="rc-txt mb-3">
                        Scan the QR code or copy the address to receive coin.
                      </p>
                      <div className="input-group address_input">
                        <span
                          className="form-control text-truncate text-center bordernone"
                          id="userEthAddress"
                        >
                          {userEthAddress}
                        </span>
                        <div className="input-group-append bordernone">
                          <button
                            className="input-group-text"
                            onClick={copyAddressETH}
                          >
                            <i className="bx bx-copy" title="Copy Address"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
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
                      {copySuccess && (
                        <Alert
                          variant="success"
                          className="mt-3"
                          onClose={() => setCopySuccess(false)}
                          dismissible
                        >
                          Address Copied
                        </Alert>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {selectedOption === "Binance Smart Chain" && (
                <div className="receive-body">
                  <div className="row">
                    <div className="col-md-4 col-12 mb-3 d-flex justify-content-center cust-center my-auto col-xl-5 col-lg-5">
                      <div>
                        <QRCode value={userEthAddress} />
                      </div>
                    </div>
                    <div className="col-md-8 col-12 mb-3 col-xl-7 col-lg-7">
                      <p className="rc-txt mb-3">
                        Scan the QR code or copy the address to receive coin.
                      </p>
                      <div className="input-group address_input">
                        <span
                          className="form-control text-truncate text-center bordernone"
                          id="userEthAddress"
                        >
                          {userEthAddress}
                        </span>
                        <div className="input-group-append bordernone">
                          <button
                            className="input-group-text"
                            onClick={copyAddressETH}
                          >
                            <i className="bx bx-copy" title="Copy Address"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
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
                      {copySuccess && (
                        <Alert
                          variant="success"
                          className="mt-3"
                          onClose={() => setCopySuccess(false)}
                          dismissible
                        >
                          Address Copied
                        </Alert>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* transaction part */}
            {selectedOption === "BLOCX Mainnet" && (
              <>
                <hr className="mb-1 text-white" />
                <div className="">
                  <div className=" h-100">
                    <div className="send-body">
                      <div className="row">
                       
                        <div className="form-group col-12 mb-3">
                       
                          <div>
                        
                          </div>
                        </div>
                        <div className="form-group col-12 mb-3">
                          <div className="input-group address_input">
                            <input
                              type="text"
                              className="form-control "
                              value={receiverAddress}
                              onChange={(e) => {
                                setReceiverAddress(e.target.value);
                              }}
                              placeholder="Enter Receiver Address"
                            />
                           
                          </div>
                        </div>
                        <div className="form-group col-12 mb-3">
                          <input
                            type="number"
                            className="form-control "
                            value={ammount}
                            onChange={(e) => {
                              setAmmount(e.target.value);
                            }}
                            placeholder="Enter Amount"
                          />
                        </div>
                        <div className="col-12">
                          <button
                            className="icon-primary text-white w-100 m-0 p-2"
                         
                            onClick={handleTransaction}
                          >
                            SEND
                          </button>
                        </div>

                        <div className="col-12">
                          {errorMessageTrans && (
                            <Alert
                              variant="danger"
                              className="m-0"
                              onClose={() => seterrorMessageTrans("")}
                              dismissible
                            >
                              Transaction Failed
                            </Alert>
                          )}
                          {tranSuccess && (
                            <Alert
                              variant="success"
                              className="m-0"
                              onClose={() => seterrorMessageTrans(false)}
                              dismissible
                            >
                              Transaction Successful
                            </Alert>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {selectedOption === "Ethereum Mainnet" && (
              <>
                <hr className="mb-1 text-white" />
                <div className="">
                  <div className=" h-100">
                    <div className="send-body">
                      <div className="row">
                        <div className="form-group col-12 mb-3">
                          <div className="input-group address_input">
                            <input
                              type="text"
                              className="form-control "
                              value={receiverAddress}
                              onChange={(e) => {
                                setReceiverAddress(e.target.value);
                              }}
                              placeholder="Enter Receiver Address"
                            />
                          </div>
                        </div>
                        <div className="form-group col-12 mb-3">
                          <input
                            type="number"
                            className="form-control "
                            value={ammount}
                            onChange={(e) => {
                              setAmmount(e.target.value);
                            }}
                            placeholder="Enter Amount"
                          />
                        </div>
                        <div className="col-12">
                          <button
                            className="icon-primary text-white w-100 m-0 p-2"
                            onClick={handleTransaction}
                          >
                            SEND
                          </button>
                        </div>
                        <div className="col-12">
                          {errorMessageTrans && (
                            <Alert
                              variant="danger"
                              className="m-0"
                              onClose={() => seterrorMessageTrans("")}
                              dismissible
                            >
                              Transaction Failed
                            </Alert>
                          )}
                          {tranSuccess && (
                            <Alert
                              variant="success"
                              className="m-0"
                              onClose={() => seterrorMessageTrans(false)}
                              dismissible
                            >
                              Transaction Successful
                            </Alert>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {selectedOption === "Binance Smart Chain" && (
              <>
                <hr className="mb-1 text-white" />
                <div className="">
                  <div className=" h-100">
                    <div className="send-body">
                      <div className="row">
                        <div className="form-group col-12 mb-3">
                          <div className="input-group address_input">
                            <input
                              type="text"
                              className="form-control "
                              value={receiverAddress}
                              onChange={(e) => {
                                setReceiverAddress(e.target.value);
                              }}
                              placeholder="Enter Receiver Address"
                            />
                          </div>
                        </div>
                        <div className="form-group col-12 mb-3">
                          <input
                            type="number"
                            className="form-control "
                            value={ammount}
                            onChange={(e) => {
                              setAmmount(e.target.value);
                            }}
                            placeholder="Enter Amount"
                          />
                        </div>
                        <div className="col-12">
                          <button
                            className="icon-primary text-white w-100 m-0 p-2"
                         
                            onClick={handleTransaction}
                          >
                            SEND
                          </button>
                        </div>
                        <div className="col-12">
                          {errorMessageTrans && (
                            <Alert
                              variant="danger"
                              className="m-0"
                              onClose={() => seterrorMessageTrans("")}
                              dismissible
                            >
                              Transaction Failed
                            </Alert>
                          )}
                          {tranSuccess && (
                            <Alert
                              variant="success"
                              className="m-0"
                              onClose={() => seterrorMessageTrans(false)}
                              dismissible
                            >
                              Transaction Successful
                            </Alert>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpenPIN && (
        <div
          id="pinModal"
          className="modal fade show"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content profile_img_model">
              <div className="modal-header d-flex justify-content-center">
                <h4 className="modal-title   ">Enter PIN</h4>
              </div>
              <div className="model-body">
                <div className="my-3 px-4 ">
                  <input
                    type="password"
                    value={enteredPin}
                    onChange={(e) => setEnteredPin(e.target.value)}
                    placeholder="Enter your PIN"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="icon-primary mb-3" onClick={handlePinSubmit}>
                  Submit
                </button>
                <button className="icon-primary  mb-3" onClick={hideModalPIN}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/*  img, video  model */}

      {isImgmodel && (
        <div className="modal fade show " style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-centered ">
            <div className="modal-content profile_img_model">
              {selectedFileIMG.startsWith("data:image") ? (
                <>
                  <div className="modal-header">
                    <h5 className="modal-title text-white">Send Photo</h5>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={() => setIsImgModel(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <img
                      className="image-fluid w-100"
                      src={selectedFileIMG}
                      alt="Profile"
                      style={{
                        Height: "200px",

                        margin: "auto",
                        display: "flex",
                      }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="modal-header">
                    <h5 className="modal-title text-white">Send Video</h5>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={() => setIsImgModel(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <video style={{ height: "200px", width: "100%" }} controls>
                      <source src={selectedFileIMG} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </>
              )}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsImgModel(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={sendMessage}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Messaging;
