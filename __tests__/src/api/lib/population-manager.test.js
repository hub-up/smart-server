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
      const socketId = faker.random.number();
      const username = faker.random.word();
      p.addUser(socketId, username);

      const receivedKey = Object.keys(p.users)[0];
      const expectedKey = socketId.toString();
      expect(receivedKey).toEqual(expectedKey);

      const receivedValue = p.users[socketId];
      const expectedValue = username;
      expect(receivedValue).toEqual(expectedValue);
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

  describe('`details` method', () => {
    let room1, room2, user1, username1, user2, username2, user3, username3;
    beforeEach(() => {
      room1 = faker.random.word();
      room2 = faker.random.word();
      user1 = faker.random.number();
      username1 = faker.random.word();
      user2 = faker.random.number();
      username2 = faker.random.word();
      user3 = faker.random.number();
      username3 = faker.random.word();

      p.addUser(user1, username1);
      p.addUser(user2, username2);
      p.addUser(user3, username3);
      p.populateRoom(user1, room1);
      p.populateRoom(user2, room2);
      p.populateRoom(user3, room2);
    });

    describe('`roomNames` property', () => {
      it('should return an array of `this.rooms` keys', () => {
        const details = p.details();
        expect(details.roomNames).toEqual(expect.arrayContaining([room1, room2]));
      });
    });
    describe('`totalRooms` property', () => {
      it('should return a number equal to the number of `this.rooms` keys', () => {
        const details = p.details();
        expect(details.totalRooms).toBe(2);
        const user = faker.random.number();
        const room = faker.random.word();
        p.populateRoom(user, room);
        const newDetails = p.details();
        expect(newDetails.totalRooms).toBe(3);
      });
    });
    describe('`totalUsers` property', () => {
      it('should return a number equal to the number of `this.users` keys', () => {
        const details = p.details();
        expect(details.totalUsers).toBe(3);

        const socketId = faker.random.number();
        const username = faker.random.word();
        p.addUser(socketId, username);

        const newDetails = p.details();
        expect(newDetails.totalUsers).toBe(4);
      });
    });
    describe('`userCountPerRoom` property', () => {
      it('should have the same number of keys as there are rooms', () => {
        const roomCount = 2;
        const details = p.details();
        const keys = Object.keys(details.userCountPerRoom).length;
        expect(keys).toBe(roomCount);
      });
      it('should have the correct number of users in each key-value array', () => {
        const d = new Population();
        d.addUser(user1, username1);
        d.addUser(user2, username2);
        d.populateRoom(user1, room1);
        d.populateRoom(user2, room1);
        const { userCountPerRoom } = d.details();
        let count = 2;
        expect(userCountPerRoom[room1]).toBe(count);

        d.addUser(user3, username3);
        d.populateRoom(user3, room1);

        const ucpr = d.details().userCountPerRoom;

        count++;
        expect(ucpr[room1]).toBe(count);
      });
    });
    describe('`usernamesPerRoom` property', () => {
      it('should have the correct users in each key-value array', () => {
        const e = new Population();
        e.addUser(user1, username1);
        e.addUser(user2, username2);
        e.populateRoom(user1, room1);
        e.populateRoom(user2, room1);
        const { usernamesPerRoom } = e.details();
        const array = [username1, username2];
        expect(usernamesPerRoom[room1]).toEqual(expect.arrayContaining(array));

        e.addUser(user3, username3);
        e.populateRoom(user3, room1);
        const newArray = [username1, username2, username3];
        const unpr = e.details().usernamesPerRoom;
        expect(unpr[room1]).toEqual(expect.arrayContaining(newArray));
      });
    });
  });
  describe('`moveUser method`', () => {
    const f = new Population();
    let user1, username1, user2, username2, user3, username3;

    const newRoom = faker.random.word();
    const oldRoom = faker.random.word();
    beforeEach(() => {
      user1 = faker.random.number();
      username1 = faker.random.word();
      user2 = faker.random.number();
      username2 = faker.random.word();
      user3 = faker.random.number();
      username3 = faker.random.word();

      f.addUser(user1, username1);
      f.addUser(user2, username2);
      f.addUser(user3, username3);
      f.populateRoom(user1, oldRoom);
      f.populateRoom(user2, oldRoom);
      f.populateRoom(user3, oldRoom);
    });

    it('should not expect the target room to exist', () => {
      const initial = f.rooms[newRoom];
      expect(initial).toBeUndefined();

      f.moveUser(user1, oldRoom, newRoom);
      const final = f.rooms[newRoom];

      expect(final).toBeDefined();
    });

    it('should add a user to a new room', () => {
      f.moveUser(user1, oldRoom, newRoom);
      const result = f.rooms[newRoom].users.includes(user1);
      expect(result).toBeTruthy();
    });
    it('should remove the user from the old room', () => {
      f.moveUser(user1, oldRoom, newRoom);
      const result = f.rooms[oldRoom].users.includes(user1);
      expect(result).toBeFalsy();
    });
    it('should not affect other users in the old room', () => {
      const result = f.rooms[oldRoom].users.includes(user2);
      expect(result).toBeTruthy();
    });
    it('should not affect users in the new room', () => {
      f.moveUser(user1, oldRoom, newRoom);
      f.moveUser(user2, oldRoom, newRoom);
      const result = f.rooms[newRoom].users.includes(user1);
      expect(result).toBeTruthy();
    });
  });
  describe('`deleteUser` method', () => {
    xit('should delete the user and socketId from the users list', () => {
      //
    });
  });
  describe('`getRoom` method', () => {
    xit('should return the room a user is in', () => {
      //
    });
  });
  describe('`getSocketId` method', () => {
    xit('should get the socketId associated with a given username', () => {
      //
    });
  });
  describe('`getUsername` method', () => {
    xit('should get the username associated with a given socketId', () => {
      //
    });
  });
  describe('`getLeader` method', () => {
    xit('should get the socketId of the leader of a room, if it exists', () => {
      //
    });
  });
  describe('`isLeader` method', () => {
    xit('should check if the socketId is the leader of the room', () => {
      //
    });
  });
  describe('`isRoom` method', () => {
    xit('should return true if the room exists', () => {
      //
    });
    xit('should return false if the room does not exist', () => {
      //
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
  });
});
