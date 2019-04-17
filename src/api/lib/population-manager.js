'use strict';

class Population {
  constructor() {
    // { socketId: username, socketId: username }
    this.users = {};
    // { roomName: { leader: socketId, users: [ socketId, socketId, socketId ] } }
    this.rooms = {};
  }
  // Add a user to a users list with their socketId
  addUser(socketId, username) {
    this.users[socketId] = username;
  }
  // Add a user to a room; if the room doesn't exist,
  // create it and indicate the leader
  // If the user is already in the room, do nothing.
  populateRoom(socketId, room) {
    // If the room already exists
    if (this.rooms[room]) {
      this.rooms[room].users.push(socketId);
      // If the room doesn't exist
    } else {
      this.rooms[room] = { leader: socketId, users: [socketId] };
    }
  }

  // Delete user and socketId from users list
  deleteUser(socketId) {
    delete this.users[socketId];
  }

  // Remove a user from a room. If the room becomes empty,
  // delete it. If the leader leaves, assign the `leader` property
  // to the person who's been there longest
  // If the user is not in the room, do nothing.
  // If the room does not exist, do nothing.
  depopulateRoom(socketId, room) {
    if (this.rooms[room]) {
      // Are we removing the leader?
      const leader = socketId === this.rooms[room].leader ? true : false;
      const index = this.rooms[room].users.findIndex(user => user === socketId);
      this.rooms[room].users.splice(index, 1);
      // If the room is empty
      if (this.rooms[room].users.length === 0) {
        // delete it
        delete this.rooms[room];
        // Otherwise if the username removed was the leader
      } else if (leader) {
        // reassign the leader property to the socketId of
        // the person who's been in the room the longest (first in the array)
        this.rooms[room].leader = this.rooms[room].users[0].socketId;
      }
    }
  }

  // Return an object that contains the following:
  // The name of each room.
  // The total number of rooms.
  // The total number of users.
  // The number of users in each room.
  // The names of users in each room.
  details() {
    const roomNames = Object.keys(this.rooms);
    const totalRooms = roomNames.length;
    const totalUsers = Object.keys(this.users).length;
    const userCountPerRoom = {};
    const socketIdsPerRoom = {};

    // Populate the two empty objects
    roomNames.forEach(room => {
      socketIdsPerRoom[room] = this.rooms[room].users;
      userCountPerRoom[room] = this.rooms[room].length;
    });
    const usernamesPerRoom = Object.assign({}, socketIdsPerRoom);
    for (let room in socketIdsPerRoom) {
      usernamesPerRoom[room] = socketIdsPerRoom[room].map(id => this.users[id]);
    }
    return { roomNames, totalRooms, totalUsers, userCountPerRoom, usernamesPerRoom };
  }

  // Remove a user from a room. If the room becomes empty,
  // delete it, preserving the leader property
  // Add the user to a different room. If the room doesn't exist,
  // create it and assigne the leader
  moveUser(socketId, oldRoom, newRoom) {
    this.depopulateRoom(socketId, oldRoom);
    this.populateRoom(socketId, newRoom);
  }
  // Return the room a user is in
  getRoom(socketId) {
    let result = null;
    for (let room in this.rooms) {
      if (this.rooms[room].users.includes(socketId)) {
        result = room;
        break;
      }
    }
    return result;
  }
  // Get the socketId associated with a given username
  getSocketId(username) {
    return Object.keys(this.users).find(socketId => this.users[socketId] === username);
  }

  // Get the username associated with a given socketId
  getUsername(socketId) {
    return this.users[socketId];
  }

  // Get the socketId of the leader of a room, if it exists
  getLeader(room) {
    if (this.rooms[room]) {
      return this.rooms[room].leader;
    }
  }
  // Check if the socketId is the leader of the room
  isLeader(socketId, room) {
    const leader = this.getLeader(room);
    return socketId === leader ? true : false;
  }

  // Return a Boolean for whether a room exists
  isRoom(room) {
    return this.rooms.hasOwnProperty(room) ? true : false;
  }

  // Returns a Boolean for whether a username is
  // currently associated with a socketId in any room
  isUsername(username) {
    return this.getSocketId(username) ? true : false;
  }
}

module.exports = Population;
