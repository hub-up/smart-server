'use strict';

const chalk = require('chalk');

const population = require('../lib/population.js');
const sendToRoom = require('../lib/send-to-room.js');
const sendToUser = require('../lib/send-to-user.js');

/***
 * Create a new room and add a user to it, if appropriate
 * @function
 * @name room
 * @param arg {string} The name of the new room
 * @param socket {object} The socket object from the client event
 * @param io {object} The server-side Socket.io instance
 ***/
const room = (arg, socket, io) => {
  const username = population.getUsername(socket.id);

  const oldRoom = population.getRoom(socket.id);
  const newRoom = arg;

  // If the user isn't already in that room
  if (oldRoom !== newRoom) {
    // Move the user out of the old room and into a newly created room
    population.moveUser(socket.id, oldRoom, newRoom);

    // Send a message to the user
    const message = `You have left ${chalk.red(oldRoom)} and created ${chalk.green(newRoom)}
You are now the leader of ${newRoom}`;
    sendToUser(message, socket, io);

    // Send a message to the room they're leaving, if it hasn't closed
    if (population.isRoom(oldRoom)) {
      const oldRoomMessage = `${username} has abandoned you in ${chalk.red(
        oldRoom
      )} and joined ${chalk.green(newRoom)}`;
      sendToRoom(oldRoomMessage, socket);
    }

    // If the user is already in the room
  } else if (oldRoom === newRoom) {
    // Send a message to the user
    const message = `You are already in ${chalk.cyan(newRoom)}`;
    sendToUser(message, socket, io);
  }
};

module.exports = room;
