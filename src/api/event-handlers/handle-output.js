'use strict';

const handleOutput = socket => {
  return payload => {
    socket.emit('output', payload);
  };
};

module.exports = handleOutput;
