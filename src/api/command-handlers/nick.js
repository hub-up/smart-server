'use strict';

const chalk = require('chalk');

const population = require('../lib/population.js');
const sendToRoom = require('../lib/send-to-room.js');
const sendToUser = require('../lib/send-to-user.js');

const nick = (arg, socket, io) => {
  const oldName = population.getUsername(socket.id);
  population.addUser(socket.id, arg);
  const name = chalk.yellow(arg);
  const room = population.getRoom(socket.id);

  // Send to room
  const roomAnnouncement = `${chalk.red(oldName)} has updated their name to ${name}`;
  sendToRoom(roomAnnouncement, room, socket);

  // Send to user
  const userMessage = `Your username has been changed to ${name}`;
  sendToUser(userMessage, socket, io);
};

module.exports = nick;
