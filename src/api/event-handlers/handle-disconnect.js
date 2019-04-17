'use strict';

const handleDisconnect = socket => {
  console.log(`${socket.id} disconnected...`);
};

module.exports = handleDisconnect;
