'use strict';

const rootDir = process.cwd();

const faker = require('faker');
const handleMessage = require(`${rootDir}/src/api/event-handlers/handle-message.js`);
const population = require(`${rootDir}/src/api/lib/population.js`);
const getUsername = jest.spyOn(population, 'getUsername').mockImplementation(() => {});
const getRoom = jest.spyOn(population, 'getRoom').mockImplementation(() => {});

jest.mock(`../../../../src/api/lib/population.js`);
jest.mock(`../../../../src/api/lib/send-to-room.js`);
jest.mock(`../../../../src/api/event-handlers/handle-message.js`);

describe('`handleMessage` function', () => {
  beforeAll(() => {
    const line = faker.hacker.phrase();
    const socket = {};
    handleMessage(line, socket);
  });

  it('should call the `population.getUsername` method', async () => {
    expect(getUsername).toHaveBeenCalled();
  });
  it('should call the `population.getRoom` method', async () => {
    expect(getRoom).toHaveBeenCalled();
  });
  xit('should call the `sendToRoom` function', () => {
    // expect(sendToRoom).toHaveBeenCalled();
  });
});
