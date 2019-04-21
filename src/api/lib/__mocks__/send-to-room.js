'use strict';

const sendToRoom = (message, room, socket) => {
  const args = { message, room, socket };
  args;
};

// Need to rewire to make this export and object like the real one
module.exports = sendToRoom;
