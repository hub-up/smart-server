'use strict';

const chalk = require('chalk');

const population = require('../lib/population.js');
const { sendToRoom } = require('../lib/send-to-room.js');

/***
 * Relay a chat input to the user's room.
 * This function should be expanded to parse emojis,
 * filter for length and spamming, and provide
 * other chat moderation features.
 * @function
 * @name handleMessage
 * @param line {string} The user's public chat message
 * @param socket {object} The socket object from the client event
 ***/
const handleMessage = (line, socket) => {
  const username = population.getUsername(socket.id);
  const room = population.getRoom(socket.id);
  const designator = chalk.yellow(`‹${username}›`);
  const message = `${designator} ${line}`;

  sendToRoom(message, room, socket);
};

module.exports = handleMessage;
