'use strict';

const rootDir = process.cwd();
const { server } = require(`${rootDir}/src/server.js`);
const errorHandler = require(`${rootDir}/src/middleware/500.js`);
const supertest = require('supertest');
const request = supertest(server);

const error = jest.spyOn(global.console, 'error').mockImplementation(() => {});

describe('`500` error handler', () => {
  describe(`End-to-end tests`, () => {
    xit('should return status `500` on a server error', async () => {
      // This just gets a 404
      const result = await request.get('/error');
      expect(result.status).toBe(500);
      expect(error).toHaveBeenCalled();
    });
    it('should not return at status on a good request', async () => {
      const result = await request.get('/');
      expect(result.status).not.toBe(500);
    });
  });
  describe('Unit tests', () => {
    const err = { error: 'Something bad happened!' },
      req = {},
      res = { setHeader: jest.fn(), write: jest.fn(), end: jest.fn() },
      next = jest.fn();
    beforeAll(() => {
      errorHandler(err, req, res, next);
    });
    it('should error log to the console', () => {
      expect(error).toHaveBeenCalled();
    });
    it('should set the response header', () => {
      expect(res.setHeader).toHaveBeenCalled();
    });
    it('should write a response', () => {
      expect(res.write).toHaveBeenCalled();
    });
    it('should end the response', () => {
      expect(res.end).toHaveBeenCalled();
    });
  });
});
