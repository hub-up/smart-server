'use strict';

/***
 * Sends a direct message to a single user
 * @function
 * @name sendToUser
 * @param message {string} The message for the user
 * @param socket {object} The socket object from the client event
 * @param io {object} The server-side Socket.io instance
 * @param id {string} The `socket.id` of the recipient if they did not initiate the event
 ***/
const sendToUser = (message, socket, io, id) => {
  const payload = { display: message };
  if (id) {
    io.to(id).emit('output', payload);
  } else {
    io.to(socket.id).emit('output', payload);
  }
};

module.exports = sendToUser;
