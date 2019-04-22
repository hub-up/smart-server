'use strict';

const rootDir = process.cwd();
const { word } = require('faker').lorem;

const {
  setGreeting,
  handleConnection,
} = require(`${rootDir}/src/api/event-handlers/handle-connection.js`);

jest.mock(`../../../../src/api/lib/send-to-user.js`);
jest.mock(`../../../../src/api/lib/send-to-room.js`);

describe('`setGreeting` function', () => {
  it('should return a string that includes a given `username`', () => {
    const username = word();
    const result = setGreeting(username);
    expect(result.includes(username)).toBeTruthy();
  });
});

describe('`handleConnection` function', () => {
  const socketId = Math.random();
  const socket = { id: socketId, join: jest.fn() };
  const io = {};
  xit('should call `sendToUser`', () => {
    //
  });
  xit('should call `sendToRoom`', () => {
    //
  });
  it('should call the `join` method of the socket', async () => {
    handleConnection(socket, io);
    expect(socket.join).toHaveBeenCalledWith('lobby');
  });
});
