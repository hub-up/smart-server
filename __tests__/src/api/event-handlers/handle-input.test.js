'use strict';

const rootDir = process.cwd();
const handleInput = require(`${rootDir}/src/api/event-handlers/handle-input.js`);

const log = jest.spyOn(global.console, 'log').mockImplementation(() => {});

jest.mock(`../../../../src/api/lib/population.js`);
jest.mock(`../../../../src/api/lib/send-to-room.js`);
jest.mock(`../../../../src/api/event-handlers/handle-message.js`);

describe('`handleInput` function', () => {
  it('should log to the console', async () => {
    const input = 'hi!';
    handleInput(input);
    expect(log).toHaveBeenCalled();
  });
});
