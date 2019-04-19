'use strict';

const path = require('path');
const modelFinder = require(path.resolve('./src/middleware/model-finder.js'));

describe('model-finder.js', () => {
  modelFinder;
  xit('should be good', () => {
    expect(true).toBeTruthy();
  });
});
