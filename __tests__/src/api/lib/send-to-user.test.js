'use strict';

const { sentence } = require('faker').lorem;
const rootDir = process.cwd();
const sendToUser = require(`${rootDir}/src/api/lib/send-to-user.js`);

describe('`sendToUser` function', () => {
  const to = jest.fn();
  const io = { to };
  const emit = jest.fn();
  to.mockReturnValue({ emit });

  const socket = { id: Math.random() };
  const message = sentence();
  const id = Math.random();

  it('should emit an `output` event with a `message` payload when no `id` argument exists', () => {
    sendToUser(message, socket, io, id);
    expect(emit).toHaveBeenCalledWith('output', message);
    emit.mockClear();
  });

  it('should emit an `output` event with a `message` payload when `id` argument exists', () => {
    sendToUser(message, socket, io, id);
    expect(emit).toHaveBeenCalledWith('output', message);
    emit.mockClear();
  });

  it('should emit a message to the `id` if the `id` argument exists`', () => {
    sendToUser(message, socket, io, id);
    expect(io.to).toHaveBeenCalledWith(id);
    to.mockClear();
  });

  it('should emit a message to the `socket.id` if the `id` argument does not exist`', () => {
    sendToUser(message, socket, io);
    expect(io.to).toHaveBeenCalledWith(socket.id);
    to.mockClear();
  });
});
