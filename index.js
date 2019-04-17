'use strict';

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const { start } = require('./src/server.js');

// Start up database server with options
const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
};

mongoose.connect(process.env.MONGODB_URI, options, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Mongoose connected...`);
  }
});

start(PORT);
