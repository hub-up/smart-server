'use strict';

const chalk = require('chalk');
const { noun } = require('faker').hacker;

const sendToRoom = require('../lib/send-to-room.js');
const sendToUser = require('../lib/send-to-user.js');

// This is in-memory storage of the current chat environment
const population = require('../lib/population.js');

const setGreeting = username => {
  const top = chalk.underline.bold.white(`\nWelcome to Hubbub!\n`);
  const usernameMsg = `Your username is ${chalk.cyan(username)}\n`;
  const help = `Type ${chalk.cyan('/help')} to see a list of commands.\n`;
  const greeting = top + usernameMsg + help;
  return greeting;
};

const handleConnection = (socket, io) => {
  // Create a random username
  const username = `${noun()}-${Math.floor(Math.random() * 1000)}`;

  // Add the user to the Lobby and update the population
  const room = 'Lobby';
  population.addUser(socket.id, username);
  population.populateRoom(socket.id, room);
  socket.join(room);

  // Greet the new user
  const welcome = setGreeting(username);
  sendToUser(welcome, socket, io);

  // Announce the new user to their room
  const message = `${username} joined ${room}`;
  sendToRoom(message, room, socket);
};

module.exports = handleConnection;
