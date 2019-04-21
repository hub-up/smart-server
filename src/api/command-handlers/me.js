'use strict';

const chalk = require('chalk');

const population = require('../lib/population.js');
const { sendToRoom } = require('../lib/send-to-room.js');

/***
 * Emit a user text-emote to their room ::shrugs::
 * @function
 * @name me
 * @param arg {string} The text-emote
 * @param socket {object} The socket object from the client event
 * @param io {object} The server-side Socket.io instance
 ***/
const me = (arg, socket) => {
  const room = population.getRoom(socket.id);
  const username = population.getUsername(socket.id);
  const emote = chalk.magenta(`${username} ${arg}`);
  sendToRoom(emote, room, socket);
};

module.exports = me;
