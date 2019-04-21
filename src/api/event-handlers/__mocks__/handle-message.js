'use strict';

const mockSocket = { id: Math.random(), to: jest.fn(), emit: jest.fn() };

const population = require('../../lib/population.js');
const { sendToRoom } = require('../../lib/send-to-room.js');

const handleMessage = (line, socket = mockSocket) => {
  const username = population.getUsername(socket.id);
  username;
  const room = population.getRoom(socket.id);

  sendToRoom(line, room, socket);
};

module.exports = handleMessage;
