'use strict';

const chalk = require('chalk');
const population = require('../lib/population.js');

const details = (undefined, socket) => {
  const details = population.details();
  const room = population.getRoom(socket.id);
  const username = population.getUsername(socket.id);
  const users = details.usernamesPerRoom[room]
    .filter(user => user !== username)
    .map(user => chalk.cyan(user))
    .join(', ');
  const message = `
  Your Socket.io client id is ${chalk.cyan(socket.id)}
  Your username is ${chalk.cyan(username)}
  You are one of ${chalk.cyan(details.totalUsers)} users in ${chalk.cyan(room)}
  Other users in the room are: ${users}
  `;
  return message;
};

module.exports = details;
