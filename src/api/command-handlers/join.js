'use strict';

const chalk = require('chalk');

const population = require('../lib/population.js');
const sendToRoom = require('../lib/send-to-room.js');
const sendToUser = require('../lib/send-to-user.js');

/***
 * Move a user to an extant room if appropriate
 * @function
 * @name join
 * @param arg {string} The name of the room to join
 * @param socket {object} The socket object from the client event
 * @param io {object} The server-side Socket.io instance
 */
const join = (arg, socket, io) => {
  const username = population.getUsername(socket.id);
  const isRoom = population.isRoom(arg);
  const oldRoom = population.getRoom(socket.id);
  const newRoom = arg;

  if (!isRoom) {
    // The room does not exist
    const message = `The room ${chalk.cyan(newRoom)} does not exist.`;
    sendToUser(message, socket, io);
    return;
  }
  // If the user isn't already in that room
  if (oldRoom !== newRoom) {
    // Move the user to the room
    population.moveUser(socket.id, oldRoom, newRoom);

    // Send a message to the user
    const newLeaderId = population.getLeader(newRoom);
    const newLeader = chalk.cyan(population.getUsername(newLeaderId));
    const message = `You have left ${chalk.red(oldRoom)} and joined ${chalk.green(newRoom)}
The leader of your room is ${newLeader}`;
    sendToUser(message, socket, io);

    // Send a message to the room they're leaving
    const oldLeaderId = population.getLeader(oldRoom);
    const oldLeader = chalk.cyan(population.getUsername(oldLeaderId));
    const oldRoomMessage = `${username} has left ${chalk.red(oldRoom)} and joined ${chalk.green(
      newRoom
    )}
The leader of your room is ${oldLeader}`;
    sendToRoom(oldRoomMessage, socket);

    // Send a message to their new room
    const newRoomMessage = `${username} has joined you in ${chalk.green(newRoom)}`;
    sendToRoom(newRoomMessage, socket);
    // If the user is already in the room
  } else if (oldRoom === newRoom) {
    // Send a message to the user
    const message = `You are already in ${chalk.cyan(newRoom)}`;
    sendToUser(message, socket, io);
  }
};

module.exports = join;
