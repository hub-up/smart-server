'use strict';

const path = require('path');
const details = require(path.resolve('./src/api/command-handlers/details.js'));
const sendToUser = require('../../../../src/api/lib/send-to-user.js');

jest.mock('../../../../src/api/lib/send-to-user.js', () => jest.fn());

describe('`details` function', () => {
  // Requires a mock implementation of the Population class
  xit('should call `sendToUser` with a string, object, object', () => {
    const socket = {};
    const io = {};
    details(undefined, socket, io);
    expect(sendToUser).toHaveBeenCalledWith(expect.any(String), socket, io);
  });
});
