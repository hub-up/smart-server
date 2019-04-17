'use strict';

const path = require('path');
const Population = require(path.resolve('./src/api/lib/population-manager.js'));
const faker = require('faker');

let p;

beforeEach(() => {
  p = new Population();
});

describe('`Population` class', () => {
  describe('`addUser` method', () => {
    it('should add a `socketId` and `username` to `this.users`', () => {
      p.addUser(1, 'bob');
      const users = p.users;
      const expected = { 1: 'bob' };
      expect(users).toEqual(expected);
      const unexpected = { bob: 1 };
      expect(users).not.toEqual(unexpected);
    });
  });
  describe('`populateRoom` method', () => {
    it('should create the room if the room does not exist', () => {
      p.populateRoom(1, 'boyo');
      const rooms = p.rooms;
      const expected = { boyo: { leader: 1, users: [1] } };
      expect(rooms).toEqual(expected);
    });
    it('should add a user to a room if the room does not exist', () => {
      const rooms = p.rooms;
      const empty = {};
      const room = faker.random.word();
      const user = faker.random.number();
      expect(rooms).toEqual(empty);
      p.populateRoom(user, room);
      const roomName = Object.keys(rooms)[0];
      expect(roomName).toBe(room);
      const expected = { leader: user, users: [user] };
      expect(rooms[room]).toEqual(expected);
      expect(rooms[room].users).toEqual(expect.arrayContaining([user]));
    });
    it('should set the new user as the `leader`', () => {
      const rooms = p.rooms;
      const room = faker.random.word();
      const user = faker.random.number();
      p.populateRoom(user, room);
      const expected = user;
      expect(rooms[room].leader).toEqual(expected);
    });
    it('should do nothing if the user is already in the room', () => {
      const room = faker.random.word();
      const user = faker.random.number();
      p.populateRoom(user, room);
    });
  });
  describe('`isUsername` method', () => {
    it('should return `true` if a username in `this.users`', () => {
      p.addUser(1, 'bob');
      const result = p.isUsername('bob');
      expect(result).toBeTruthy();
    });
    it('should return `false` if a username does not exist in `this.users`', () => {
      p.addUser(1, 'tom');
      const result = p.isUsername('bob');
      expect(result).toBeFalsy();
    });
    it('should return `false` if a username does not exist in `this.users`', () => {});
  });
});
