'use strict';

const chalk = require('chalk');

const population = require('../lib/population.js');
const sendToUser = require('../lib/send-to-user.js');

/***
 * Send a direct message from a user to a recipient
 * @function
 * @name msg
 * @param arg {string} The username of the intended recipient
 * @param socket {object} The socket object from the client event
 * @param io {object} The server-side Socket.io instance
 ***/
const msg = (arg, socket, io) => {
  const username = population.getUsername(socket.id);

  const regex = /([\w\d]+|[\d]+|[\w]+|-)+\b/i;
  const recipient = arg.match(regex)[0];

  const recipientId = population.getSocketId(recipient);

  // If the recipient exists, send the message to them
  if (recipientId) {
    const designator = chalk.magenta(`[${username} → ${recipient}]`);
    const msg = arg.slice(recipient.length, arg.length);
    const message = designator + msg;
    sendToUser(message, socket, io, recipientId); // 4 arguments
  } else {
    // Else inform the user of the problem
    const message = chalk.red(`The user '${recipient}' does not exist`);
    sendToUser(message, socket, io); // 3 arguments
  }
};

module.exports = msg;
