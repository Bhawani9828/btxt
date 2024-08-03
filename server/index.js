const config = require("../config");
const socket = require("./lib/socket");
const cors = require("cors");
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const WebSocket = require("ws");
const app = express();
app.use(cors());
app.use(bodyParser.json());
const io = require('socket.io');

const server = http.createServer(app);
const wss = new WebSocket.Server({ port: 3001 });

const dataFilePath = path.join(__dirname, "savedData.json");
let savedData = "";

try {
  savedData = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
} catch (error) {
  if (error.code === "ENOENT") {
    fs.writeFileSync(dataFilePath, JSON.stringify(savedData || {}), "utf8");
  } else {
    console.error("Error loading saved data:", error);
  }
}

function saveSavedData() {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(savedData), "utf8");
  } catch (error) {
    console.error("Error saving data:", error);
  }
}

// app.post("/api/data", (req, res) => {
//   if (req.body && req.body.addw) {
//     const receivedData = req.body.addw;
//     savedData = receivedData;
//     saveSavedData();
//     res.status(200).json({ message: "Data received successfully!" });
//   } else {
//     res.status(400).json({ message: "Invalid request body!" });
//   }
// });

// WebSocket connection handling
// wss.on("connection", (ws) => {
//   ws.on("message", (message) => {
//     try {
//       const data = JSON.parse(message);
//       // console.log("ADDRESSS :::::", data);
//       savedData = data.addw;
//       saveSavedData();
//     } catch (error) {
//       console.error("Error parsing message:", error);
//     }
//   });
// });

// async function helloWorld()
// {
//   return savedData ;
// }

// exports.hello = async () => {
//   const val = await helloWorld() ;
//   return val ;
// }

server.listen(config.PORT, () => {
  socket(server);
  console.log("Server is listening at :", config.PORT);
});
