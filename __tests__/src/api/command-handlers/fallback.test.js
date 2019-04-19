'use strict';

const path = require('path');
const fallback = require(path.resolve('./src/api/command-handlers/fallback.js'));
const sendToUser = require('../../../../src/api/lib/send-to-user.js');

jest.mock('../../../../src/api/lib/send-to-user.js', () => jest.fn());

describe('`fallback` function', () => {
  it('should call `sendToUser` with a string, object, object', () => {
    const socket = {};
    const io = {};
    fallback(undefined, socket, io);
    expect(sendToUser).toHaveBeenCalledWith(expect.any(String), socket, io);
  });
});
