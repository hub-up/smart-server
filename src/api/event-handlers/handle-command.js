'use strict';

const handlerFinder = require('../lib/handler-finder.js');

const parse = line => {
  // Grab a case insensitive command
  const cmd = line.match(/[a-z]+\b/i)[0];
  // Grab the arguments
  const arg = line.slice(cmd.length + 2, line.length);
  // Return them
  return { cmd, arg };
};

// Should return a string or null.
const handleCommand = async (line, socket, io) => {
  // Parse the line for command and argument
  const { cmd, arg } = parse(line);
  // Pick the right handler based on the command
  const handler = await handlerFinder(cmd);
  // Use the handler to return the right result
  const result = await handler(arg, socket, io);
  // Return the result to handle-input.js
  return result;
};

module.exports = handleCommand;
