'use strict';

const path = require('path');
const help = require(path.resolve('./src/api/command-handlers/help.js'));
const sendToUser = require('../../../../src/api/lib/send-to-user.js');

jest.mock('../../../../src/api/lib/send-to-user.js', () => jest.fn());

describe('`help` function', () => {
  it('should call `sendToUser` with a string, object, object', () => {
    const socket = {};
    const io = {};
    help(undefined, socket, io);
    expect(sendToUser).toHaveBeenCalledWith(expect.any(String), socket, io);
  });
});
