import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { faPhone, faVideo } from "@fortawesome/free-solid-svg-icons";
import ActionButton from "./ActionButton";
import { socket } from "../communication";
import axios from "axios";

function useClientID() {
  const [clientID, setClientID] = useState("");

  useEffect(() => {
    socket
      .on("connect", () => {
        const id = localStorage.getItem("address");
        socket.emit("init", { id });
        console.log("CONNECTED");
      })
      .on("init", ({ id }) => {
        console.log("INITIATED");
        document.title = `${id} - VideoCall`;
        setClientID(id);
      });
  }, []);

  return clientID;
}

function MainWindow({ startCall }) {
  const clientID = useClientID();
  // const [friendID, setFriendID] = useState(() => localStorage.getItem('roomIdUser') || '');
  // const friendID = localStorage.getItem('roomIdUser');

  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     // Update friendID whenever roomIdUser changes in localStorage
  //     setFriendID(localStorage.getItem('roomIdUser') || '');
  //   };

  //   // Listen to storage event
  //   window.addEventListener('storage', handleStorageChange);

  //   // Cleanup function
  //   return () => {
  //     window.removeEventListener('storage', handleStorageChange);
  //   };
  // }, []); 

  // const handleFriendIDChange = (event) => {
  //   const newFriendID = event.target.value;
  //   setFriendID(newFriendID);

  //   // Also update localStorage immediately
  //   // localStorage.setItem('roomIdUser', newFriendID);
  // };

  const callWithVideo = (video) => {
    const config = { audio: true, video };
    startCall(true, localStorage.getItem('roomIdUser'), config);
  };



  return (
    <div className=" ">
      <div>
        <h3>
          
          <input type="text" className="txt-clientId" value={clientID} hidden  />
        </h3>
        
      </div>
      <div>
        {/* <input
          type="text"
          className="txt-clientId"
          spellCheck={false}
          placeholder="Your friend ID"
          value={friendID}
          // onChange={handleFriendIDChange}
       hidden
        /> */}
        <div>
          <ActionButton icon={faVideo} onClick={() => callWithVideo(true)} />
          <ActionButton icon={faPhone} onClick={() => callWithVideo(false)} />
        </div>
      </div>
    </div>
  );
}

MainWindow.propTypes = {
  startCall: PropTypes.func.isRequired,
};

export default MainWindow;
