'use strict';

const path = require('path');
const about = require(path.resolve('./src/api/command-handlers/about.js'));
const sendToUser = require('../../../../src/api/lib/send-to-user.js');

jest.mock('../../../../src/api/lib/send-to-user.js', () => jest.fn());

describe('`about` function', () => {
  it('should call `sendToUser` with a string, object, object', () => {
    const socket = {};
    const io = {};
    about(undefined, socket, io);
    expect(sendToUser).toHaveBeenCalledWith(expect.any(String), socket, io);
  });
});
