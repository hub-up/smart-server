'use strict';

const chalk = require('chalk');
const sendToUser = require('../lib/send-to-user.js');

const todo = chalk.yellow('TODO: ');

const instructions = `
${chalk.underline.bold('Chat Commands')}
/bye ← ${todo}Disconnect from the server and exit the program
/details ← See your name, the room you're in, and a list of other users in your current room
/help ← This menu
/launch ${chalk.green('game')} ← ${todo}Send me to a ${chalk.green('game')}!
/leave ← Leave the current room and return to the lobby
/join ${chalk.blue('room')} ← Join the ongoing chat in ${chalk.blue('room')}
/me :D ← Emotes lamely. ${chalk.magenta(':D')}
/msg ${chalk.yellow('user')} ← Send a direct message to ${chalk.yellow('user')}
/nick ${chalk.cyan('username')} ← Update your username to ${chalk.cyan('username')}
/room ${chalk.green('name')} ← Create and automatically join a room called ${chalk.green('name')}
`;
/***
 * Display a list of available commands to the user
 * @function
 * @name help
 * @param undefined {undefined} Unused parameter
 * @param socket {object} The socket object from the client event
 * @param io {object} The server-side Socket.io instance
 ***/
const help = (undefined, socket, io) => {
  sendToUser(instructions, socket, io);
};

module.exports = help;
