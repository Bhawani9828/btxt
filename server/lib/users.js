const { v4: uuidv4 } = require("uuid");
const index = require("../index") ;
// const MAX_TRIES = 10;
const users = {};



// function generateRandomID() {
// //   return uuidv4() ;
//   return index.hello() ;
// }

exports.create = async (socket) => {
  const id =''
  if (id) {
    users[id] = socket;
  }
  return id;
};

exports.get = (id) => users[id];

exports.remove = (id) => delete users[id];
