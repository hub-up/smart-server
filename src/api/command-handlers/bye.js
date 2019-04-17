'use strict';

const sendToUser = require('../lib/send-to-user.js');

const bye = (undefined, socket, io) => {
  const message = 'Soon, this command will disconnect you from your client.';
  sendToUser(message, socket, io);
};

module.exports = bye;
