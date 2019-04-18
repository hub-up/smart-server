'use strict';

const chalk = require('chalk');
const sendToUser = require('../lib/send-to-user.js');

/***
 * Launch fallback
 * If the `/launch` command was entered without an argument,
 * users will see this message.
 * @param undefined {undefined} Unused parameter
 *
 */
const launch = (undefined, socket, io) => {
  const message = `Make sure to enter the link to the application after ${chalk.cyan('/launch')}
For example:
${chalk.cyan('/launch https://frozen-everglades-56570.herokuapp.com')}
`;
  sendToUser(message, socket, io);
};

module.exports = launch;
