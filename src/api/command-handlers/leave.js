'use strict';

const chalk = require('chalk');

const population = require('../lib/population.js');
const sendToRoom = require('../lib/send-to-room.js');
const sendToUser = require('../lib/send-to-user.js');

/***
 * Move a user from a room to the Lobby
 * @function
 * @name leave
 * @param undefined {undefined} Unused parameter
 * @param socket {object} The socket object from the client event
 * @param io {object} The server-side Socket.io instance
 */
const leave = (undefined, socket, io) => {
  const username = population.getUsername(socket.id);

  // Move the user from room to the Lobby
  const oldRoom = population.getRoom(socket.id);
  const newRoom = 'Lobby';

  if (oldRoom !== newRoom) {
    population.moveUser(socket.id, oldRoom, newRoom);

    // Send a message to the user
    const message = `You have left ${chalk.red(oldRoom)} and joined ${chalk.green(newRoom)}`;
    sendToUser(message, socket, io);

    // Send a message to the room they're leaving
    const leaderId = population.getLeader(oldRoom);
    const leader = chalk.cyan(population.getUsername(leaderId));
    const oldRoomMessage = `${username} has left ${chalk.red(oldRoom)} and joined ${chalk.green(
      newRoom
    )}
The leader of your room is ${leader}`;
    sendToRoom(oldRoomMessage, socket);

    // Send a message to their new room
    const newRoomMessage = `${username} has joined you in ${chalk.green(newRoom)}`;
    sendToRoom(newRoomMessage, socket);
  } else {
    // Send a message to the user
    const message = `You are already in ${chalk.cyan(newRoom)}`;
    sendToUser(message, socket, io);
  }
};

module.exports = leave;
