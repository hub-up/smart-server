'use strict';

const rootDir = process.cwd();
const population = require(`${rootDir}/src/api/lib/population.js`);
const handleDisconnect = require(`${rootDir}/src/api/event-handlers/handle-disconnect.js`);

const log = jest.spyOn(global.console, 'log').mockImplementation(() => {});
const depopulateRoom = jest.spyOn(population, 'depopulateRoom').mockImplementation(() => {});
const deleteUser = jest.spyOn(population, 'deleteUser').mockImplementation(() => {});

describe('`handleDisconnect` function', () => {
  const id = Math.random();
  const socket = { id, leave: jest.fn() };
  beforeAll(() => {
    handleDisconnect(socket);
  });
  it('should call the `population.depopulateRoom` method', async () => {
    expect(depopulateRoom).toHaveBeenCalled();
  });
  it('should call the `population.deleteUser` method', async () => {
    expect(deleteUser).toHaveBeenCalled();
  });
  it('should call the `leave` method of the socket', async () => {
    expect(socket.leave).toHaveBeenCalled();
  });
  it('should log to the console', async () => {
    expect(log).toHaveBeenCalled();
  });
});
