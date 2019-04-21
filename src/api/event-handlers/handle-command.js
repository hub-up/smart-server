'use strict';

const handlerFinder = require('../lib/handler-finder.js');

/***
 * Separates a command's command and argument
 * @function
 * @name parse
 * @param line {string} A command input from the user
 ***/
const parse = line => {
  // Grab a case insensitive command
  const cmd = line.match(/[a-z]+\b/i)[0];
  // Grab the arguments
  const arg = line.slice(cmd.length + 2, line.length);
  // Return them
  return { cmd, arg };
};

/***
 * Middleware to process commands from the user.
 * @function
 * @name handleCommand
 * @param line {string} The input from the client
 * @param socket {object} The socket object from the client event
 * @param io {object} The server-side Socket.io instance
 ***/
const handleCommand = async (line, socket, io) => {
  try {
    // Parse the line for command and argument
    const { cmd, arg } = parse(line);
    // Pick the right handler based on the command
    const handler = await handlerFinder(cmd);
    // Use the handler to return the right result
    const result = await handler(arg, socket, io);
    // Return the result to handle-input.js
    return result;
  } catch (err) {
    console.error(err);
  }
};

module.exports = { parse, handleCommand };
