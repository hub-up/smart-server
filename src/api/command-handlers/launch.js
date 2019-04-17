'use strict';

const sendToUser = require('../lib/send-to-user.js');

const launch = (arg, socket, io) => {
  const message = `Eventually, this command will take you out of the chat and launch ${arg}!`;
  sendToUser(message, socket, io);
};

module.exports = launch;
