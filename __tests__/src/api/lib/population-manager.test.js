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
      const room = faker.random.word();
      const user = faker.random.number();
      p.populateRoom(user, room);
      const rooms = p.rooms;
      const expected = { leader: user, users: [user] };
      expect(rooms[room]).toEqual(expected);
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
  // Remove a user from a room. If the room becomes empty,
  // delete it. If the leader leaves, assign the `leader` property
  // to the person who's been there longest
  // If the user is not in the room, do nothing.
  // If the room does not exist, do nothing.
  describe('`depopulateRoom` method', () => {
    let room, rooms, user1, user2;
    beforeEach(() => {
      rooms = p.rooms;
      room = faker.random.word();
      user1 = faker.random.number();
      user2 = faker.random.number();
      p.populateRoom(user1, room);
      p.populateRoom(user2, room);
    });
    it('should remove a user from a room', () => {
      console.log('test side: rooms[room]:', rooms[room]);
      p.depopulateRoom(user2, room);
      const expected = { leader: user1, users: [user1] };
      expect(rooms[room]).toEqual(expected);
    });
    it('should delete the room if it no longer exists', () => {
      p.depopulateRoom(user1, room);
      p.depopulateRoom(user2, room);
      expect(rooms[room]).toBeUndefined();
    });
    it('should assign the `leader` property to the person who has been there longest if the room still exists', () => {
      p.depopulateRoom(user1, room);
      const expected = { leader: user2, users: [user2] };
      expect(rooms[room]).toEqual(expected);
    });
    it('should do nothing if the user is not in the room', () => {
      const user3 = faker.random.number();
      const copy = Object.assign({}, rooms[room]);
      p.depopulateRoom(user3, room);
      expect(copy.users).toEqual(rooms[room].users);
      expect(copy.leader).toEqual(rooms[room].leader);
    });
    it('should do nothing if the room does not exist', () => {
      p.depopulateRoom(user1, room);
      p.depopulateRoom(user2, room);
      expect(rooms[room]).toBeUndefined();
    });
  });

  describe('`isUsername` method', () => {
    it('should return `true` if a username in `this.users`', () => {
      const socketId = faker.random.number();
      const username = faker.random.word();
      p.addUser(socketId, username);
      const result = p.isUsername(username);
      expect(result).toBeTruthy();
    });
    it('should return `false` if a username does not exist in `this.users`', () => {
      const username = faker.random.word();
      const result = p.isUsername(username);
      expect(result).toBeFalsy();
    });
    it('should return `false` if a username does not exist in `this.users`', () => {});
  });
});
