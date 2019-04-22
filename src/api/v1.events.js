'use strict';

const { handleConnection } = require('./event-handlers/handle-connection.js');
const handleDisconnect = require('./event-handlers/handle-disconnect.js');
const handleInput = require('./event-handlers/handle-input.js');

const events = io => {
  io.on('connection', socket => {
    console.log(`Socket connected with id ${socket.id}...`);

    handleConnection(socket, io);

    socket.on('input', line => handleInput(line, socket, io));
    socket.on('disconnect', () => handleDisconnect(socket));
  });
};

module.exports = events;
