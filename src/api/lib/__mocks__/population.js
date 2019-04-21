'use strict';

const faker = require('faker');

const Population = require('../population-manager.js');

const population = new Population();

const socketId1 = faker.random.number();
const username1 = faker.lorem.word();

const socketId2 = faker.random.number();
const username2 = faker.lorem.word();

const socketId3 = faker.random.number();
const username3 = faker.lorem.word();

population.addUser(socketId1, username1);
population.addUser(socketId2, username2);
population.addUser(socketId3, username3);

module.exports = population;
