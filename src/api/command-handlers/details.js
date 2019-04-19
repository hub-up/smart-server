'use strict';

const chalk = require('chalk');
const population = require('../lib/population.js');
const sendToUser = require('../lib/send-to-user.js');

/***
 * Display details to the user including their username,
 * their room, and the users they're with.
 * @function
 * @name details
 * @param undefined {undefined} Unused parameter
 * @param socket {object} The socket object from the client event
 * @param io {object} The server-side Socket.io instance
 */
const details = (undefined, socket, io) => {
  const details = population.details();
  const room = population.getRoom(socket.id);
  const username = population.getUsername(socket.id);
  const users = details.usernamesPerRoom[room]
    .filter(user => user !== username)
    .map(user => chalk.cyan(user))
    .join(', ');
  const leaderId = population.getLeader(room);
  const leader = chalk.cyan(population.getUsername(leaderId));
  const message = `
  Your Socket.io client id is ${chalk.cyan(socket.id)}
  Your username is ${chalk.cyan(username)}
  You are one of ${chalk.cyan(details.userCountPerRoom[room])} users in ${chalk.cyan(room)}
  Other users in the room are: ${users}
  The leader of your room is ${leader}
  `;

  sendToUser(message, socket, io);
};

module.exports = details;
