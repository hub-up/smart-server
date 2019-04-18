'use strict';

const chalk = require('chalk');
const sendToUser = require('../lib/send-to-user.js');

const instructions = `
${chalk.underline.bold('Chat Commands')}
/details ← See your name, the room you're in, and a list of other users in your current room
/exit ← Disconnect from the server and exit the program
/help ← This menu
/launch ${chalk.green('url')} ← Send me to the application at ${chalk.green('url')}!
/leave ← Return to the chat lobby, even if you're in an external application
/list ← See a list of external applications you can run
/lobby ← Reconnect to the chat server
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
