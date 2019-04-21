'use strict';

const rootDir = process.cwd();
const { word } = require('faker').lorem;
const {
  parse /*, handleCommand */,
} = require(`${rootDir}/src/api/event-handlers/handle-command.js`);

jest.mock(`../../../../src/api/lib/handler-finder.js`, () => jest.fn());
jest.mock(`../../../../src/api/command-handlers/about.js`, () => jest.fn());
jest.mock(`../../../../src/api/command-handlers/fallback.js`, () => jest.fn());

describe('`parse` function', () => {
  it('should correctly separate the `cmd` from the `arg` and return an object', () => {
    try {
      const cmd = word();
      const arg = word();
      const line = `/${cmd} ${arg}`;
      const expected = { cmd, arg };
      expect(parse(line)).toEqual(expected);
    } catch (err) {
      console.error(err);
    }
  });
});

describe('`handleCommand` function', () => {
  xit('should call the `handlerFinder` function', async () => {
    try {
      // const cmd = 'about';
      // const line = `/${cmd}`;
      // const socket = {};
      // handleCommand(line, socket);
      // expect(parse).toHaveBeenCalledWith(line);
      // expect(handlerFinder).toHaveBeenCalledWith(cmd);
      // expect(handler).toHaveBeenCalledWith(arg, socket, line);
    } catch (err) {
      console.error(err);
    }
  });
});
