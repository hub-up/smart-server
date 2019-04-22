'use strict';

const { word } = require('faker').lorem;

const path = require('path');
const join = require(path.resolve('./src/api/command-handlers/join.js'));
const sendToUser = require('../../../../src/api/lib/send-to-user.js');
const population = require('../../../../src/api/lib/population.js');
// const { sendToRoom } = require('../../../../src/api/lib/send-to-room.js');

jest.mock('../../../../src/api/lib/send-to-user.js', () => jest.fn());
jest.mock('../../../../src/api/lib/send-to-room.js', () => jest.fn());
jest.mock('../../../../src/api/lib/population.js');

const moveUser = jest.spyOn(population, 'moveUser');

// arg, socket, io
describe('`join` function', () => {
  it('should send a message to the user if the room does not exist', () => {
    const socket = { id: 1 }; // Must match the population mock
    const io = {};
    const room = word(); // assuming this room does not exist
    join(room, socket, io);
    expect(sendToUser).toHaveBeenCalledWith(expect.any(String), socket, io);
  });
  it('should send a message to the user if they are already in the target room', () => {
    const socket = { id: 1 }; // Must match the population mock
    const io = {};
    const room = 'lobby'; // Must match the population mock
    join(room, socket, io);
    expect(sendToUser).toHaveBeenCalledWith(expect.any(String), socket, io);
  });
  xit('should move the user to the new room if the move is viable', () => {
    // Need to update wiring of sendToRoom mock to get this to work
    const socket = { id: 1, leave: jest.fn(), join: jest.fn() }; // Must match the population mock
    const io = {};

    // Matches mocks
    const oldRoom = 'special';
    const newRoom = 'special';

    join(newRoom, socket, io);
    expect(moveUser).toHaveBeenCalledWith(socket.id, oldRoom, newRoom);
    expect(socket.join).toHaveBeenCalledWith(newRoom);
    expect(socket.leave).toHaveBeenCalledWith(oldRoom);
    expect(population.rooms['special'].users.includes(socket.id)).toBeTruthy();
  });
  xit('should send a message to the new room if the move is viable', () => {
    //
  });
  xit('should send a message to the user if the move is viable', () => {
    //
  });
});
