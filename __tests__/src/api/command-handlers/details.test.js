'use strict';

const path = require('path');
const details = require(path.resolve('./src/api/command-handlers/details.js'));
const sendToUser = require('../../../../src/api/lib/send-to-user.js');

jest.mock('../../../../src/api/lib/send-to-user.js', () => jest.fn());
jest.mock('../../../../src/api/lib/population.js');

describe('`details` function', () => {
  it('should call `sendToUser` with a string, object, object', () => {
    const socket = { id: 1 }; // Must match the population mock

    const io = {};
    details(undefined, socket, io);
    expect(sendToUser).toHaveBeenCalledWith(expect.any(String), socket, io);
  });
});
