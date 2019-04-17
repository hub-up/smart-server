'use strict';

const chalk = require('chalk');
const sendToUser = require('../lib/send-to-user.js');

/***
 * Warn the user when they have used an invalid command
 * @function
 * @name fallback
 * @param undefined {undefined} Unused parameter
 * @param socket {object} The socket object from the client event
 * @param io {object} The server-side Socket.io instance
 */
const fallback = (undefined, socket, io) => {
  const message = `Type ${chalk.cyan('/help')} to see a list of available commands.\n`;
  sendToUser(message, socket, io);
};

module.exports = fallback;
