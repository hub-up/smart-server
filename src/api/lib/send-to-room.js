'use strict';

/***
 * Sends a message to everyone in the room except the user
 * @function
 * @name sendToRoom
 * @param message {string} The message to be announced
 * @param room {string} The name of the Socket.io room
 * @param socket {object} The socket object from the client event
 ***/
const sendToRoom = (message, room, socket) => {
  const payload = { display: message };
  socket.to(room).emit('output', payload);
};

module.exports = sendToRoom;
