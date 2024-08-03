const io = require("socket.io");

function initSocket(socket, socketsMap) {
  let id;

  socket
    .on("init", (data) => {
      if (data && data.id) {
        id = data.id;
        socket.emit("init", { id });
        socketsMap.set(id, socket); // Store the socket with the corresponding ID
      } else {
        socket.emit("error", { message: "Invalid ID" });
      }
    })
    .on("request", (data) => {
      const receiver = socketsMap.get(data.to);
      if (receiver) {
        receiver.emit("request", { from: id });
      } else {
        socket.emit("failed");
      }
    })
    .on("call", (data) => {
      const receiver = socketsMap.get(data.to);
      if (receiver) {
        receiver.emit("call", { ...data, from: id });
      } else {
        socket.emit("failed");
      }
    })
    .on("end", (data) => {
      const receiver = socketsMap.get(data.to);
      if (receiver) {
        receiver.emit("end");
      }
    })
    .on("disconnect", () => {
      socketsMap.delete(id);
      console.log(id, "disconnected");
    });
}

module.exports = (server) => {
  const socketsMap = new Map();
  io({ path: "/bridge", serveClient: false })
    .listen(server, { log: true })
    .on("connection", (socket) => {
      initSocket(socket, socketsMap);
    });
};
