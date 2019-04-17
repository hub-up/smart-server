'use strict';

/***
 * Sends a message to everyone in the room except the user
 * @function
 * @name sendToUser
 * @param message {string} The message for the user
 * @param socket {object} The socket object from the client event
 * @param io {object} The server-side Socket.io instance
 ***/
const sendToUser = (message, socket, io) => {
  const payload = { display: message };
  io.to(socket.id).emit('output', payload);
};

module.exports = sendToUser;
