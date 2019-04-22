'use strict';

const population = require('../lib/population.js');

/***
 * Removes the user from the population memory pool
 * and performs other cleanup
 * @function
 * @name handleDisconnect
 * @param socket {object} The socket object from the client event
 ***/
const handleDisconnect = async socket => {
  try {
    const room = await population.getRoom(socket.id);
    population.depopulateRoom(socket.id, room);
    population.deleteUser(socket.id);
    socket.leave(room);
    console.log(`${socket.id} disconnected...`);
  } catch (err) {
    console.error(err);
  }
};

module.exports = handleDisconnect;
