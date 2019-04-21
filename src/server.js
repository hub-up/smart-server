'use strict';

/***
 * Express/Socket.io server
 * @module src/server
 ***/

const cwd = process.cwd();

// Express
const express = require('express');
const app = express();
const server = require('http').Server(app);

// Events
const io = require('socket.io')(server);
const events = require('./api/v1.events.js');
events(io);

// Middleware
const cors = require('cors');
const morgan = require('morgan');
app.use(morgan('tiny'));
app.use(cors());

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Documentation
app.use('/docs', express.static(`${cwd}/docs`));
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require(`${cwd}/docs/config/swagger.json`);
app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Routes
const v1Router = require('./api/v1.router.js');
app.use(v1Router);

// Error handling
const notFound = require('./middleware/404.js');
const serverError = require('./middleware/500.js');
app.use('*', notFound);
app.use(serverError);

module.exports = {
  app, // Express app
  server, // Integrated Express/Socket.io server
  start: port =>
    server.listen(port, err => {
      if (err) {
        console.error('There was an error starting the server...');
      } else {
        console.log(`You are connected to the Express server on port ${port}...`);
        console.log(`Socket.io server up and running!`);
      }
    }),
};
