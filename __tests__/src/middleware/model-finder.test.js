'use strict';

const rootDir = process.cwd();
const modelFinder = require(`${rootDir}/src/middleware/model-finder.js`);

describe('model-finder.js', () => {
  const req = { params: { model: 'app-info' } };
  const res = {};
  const next = jest.fn();
  beforeAll(() => {
    modelFinder(req, res, next);
  });
  it('should append an object to the request as a `model` property', () => {
    expect(req.model).toBeDefined();
  });
  it('should call the `next` function', () => {
    modelFinder(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
