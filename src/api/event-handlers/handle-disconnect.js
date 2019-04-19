'use strict';

const population = require('../lib/population.js');

const handleDisconnect = async socket => {
  const room = await population.getRoom(socket.id);
  population.depopulateRoom(socket.id, room);
  population.deleteUser(socket.id);
  socket.leave(room);
  console.log(`${socket.id} disconnected...`);
};

module.exports = handleDisconnect;
