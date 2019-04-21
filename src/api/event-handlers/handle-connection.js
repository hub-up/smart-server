'use strict';

const chalk = require('chalk');
const emojic = require('emojic');
const { noun } = require('faker').hacker;

const sendToRoom = require('../lib/send-to-room.js');
const sendToUser = require('../lib/send-to-user.js');

// This is in-memory storage of the current chat environment
const population = require('../lib/population.js');

/***
 * Set a standard greeting, given a username
 * @function
 * @name setGreeting
 * @param username {string} The user's username
 ***/
const setGreeting = username => {
  const smiley = chalk.bold.yellow(emojic.grin);
  const wave = chalk.bold.yellow(emojic.wave);
  const welcome = chalk.underline.bold.white(`Welcome to Hubbub!`);
  const main = `\n${smiley} ${welcome} ${wave}\n`;
  const usernameMsg = `Your username is ${chalk.cyan(username)}\n`;
  const help = `Type ${chalk.cyan('/help')} to see a list of commands.\n`;
  const greeting = main + usernameMsg + help;
  return greeting;
};

/***
 * On socket connection, greet the user, add them to the lobby,
 * and announce their presence to the lobby.
 * @function
 * @name handleConnection
 * @param socket {object} The socket object from the client event
 * @param io {object} The server-side Socket.io instance
 ***/
const handleConnection = (socket, io) => {
  // Create a random username
  const username = `${noun()}-${Math.floor(Math.random() * 1000)}`;

  // Add the user to the Lobby and update the population
  const room = 'lobby';
  population.addUser(socket.id, username);
  population.populateRoom(socket.id, room);
  socket.join(room);

  // Greet the new user
  const welcome = setGreeting(username);
  sendToUser(welcome, socket, io);

  // Announce the new user to their room
  const message = `${chalk.yellow(username)} joined ${chalk.cyan(room)}`;
  sendToRoom(message, room, socket);
};

module.exports = { setGreeting, handleConnection };
