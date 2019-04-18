'use strict';

const path = require('path');
const ModelClass = require(path.resolve('src/models/model.model.js'));

describe('`ModelClass` class', () => {
  it('should be alive', () => {
    expect(ModelClass).toBeDefined();
    expect(true).toBeTruthy();
  });
});
