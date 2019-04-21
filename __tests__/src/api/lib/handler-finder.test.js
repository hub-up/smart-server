'use strict';

const { word } = require('faker').lorem;

const rootDir = process.cwd();
const handlerFinder = require(`${rootDir}/src/api/lib/handler-finder.js`);

describe('`handlerFinder` function', () => {
  it('should return the export from an existing handler on a valid `cmd` argument', () => {
    const result = handlerFinder('about');
    expect(result.name).toBe('about');
  });
  it('should return a fallback handler on an invalid `cmd` argument', () => {
    const invalid = word();
    const result = handlerFinder(invalid);
    expect(result.name).toBe('fallback');
  });
});
