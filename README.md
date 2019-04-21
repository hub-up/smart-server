![CF](http://i.imgur.com/7v5ASc8.png) LAB
=================================================

## Midterm Project: Hubbub Chat Server

### Author: Joseph Wolfe, Alex White, Spencer Hirata

### Links and Resources
* [repo](https://github.com/hub-up/smart-server)
* [![Build Status](https://travis-ci.com/hub-up/smart-server.svg?branch=heroku)](https://travis-ci.com/hub-up/smart-server)
* [back-end](https://shrouded-everglades-62939.herokuapp.com/)

#### Documentation
* [swagger](https://shrouded-everglades-62939.herokuapp.com/api/v1/docs)
* [jsdoc](https://shrouded-everglades-62939.herokuapp.com/docs/)

### Modules
`./index.js`

`./src/server.js`

`./src/api/v1.router.js`

`./src/api/v1.events.js`

##### Command Handlers
`./src/api/command-handlers/about.js`

`./src/api/command-handlers/details.js`

`./src/api/command-handlers/fallback.js`

`./src/api/command-handlers/help.js`

`./src/api/command-handlers/join.js`

`./src/api/command-handlers/launch.js`

`./src/api/command-handlers/leave.js`

`./src/api/command-handlers/me.js`

`./src/api/command-handlers/msg.js`

`./src/api/command-handlers/nick.js`

`./src/api/command-handlers/room.js`

##### Event Handlers

`./src/api/event-handlers/handle-command.js`

`./src/api/event-handlers/handle-connection.js`

`./src/api/event-handlers/handle-disconnect.js`

`./src/api/event-handlers/handle-input.js`

`./src/api/event-handlers/handle-message.js`

##### Library

`./src/api/lib/handler-finder.js`

`./src/api/lib/population-manager.js`

`./src/api/lib/population.js`

`./src/api/lib/send-to-room.js`

`./src/api/lib/send-to-user.js`

##### Middleware

`./src/middleware/404.js`

`./src/middleware/500.js`

`./src/middleware/model-finder.js`

##### Models

`./src/models/model.model.js`

`./src/models/app-info/app-info.model.js`

`./src/models/app-info/app-info.schema.js`

-----

#### `./index.js`
##### Exported Values and Methods
This is the entry point of the application. When the app starts, the database and Socket.io connections are initiated.

-----

#### `.src/server.js`
##### Exported Values and Methods from `./src/server.js`
This module instantiates the app, sets middleware, routes, and controllers, and exports an `app`, `server` and `start` method for the combined Express/Socket.io server.

-----
#### `.src/api/v1.router.js`
##### Exported Values and Methods
This module exports an Express `router` with dynamic endpoints that correspond to the `model` instance determined by the `modelFinder` module from `./src/middleware/model-finder.js`. Most routes (except `/`) invoke a REST method that manipulates the `model`'s class methods using the data provided to the endpoint in the request as arguments.

* `GET`
  * `/` → Returns a short welcome message.
  * `/api/v1/:model` → Returns all `model` records from the database.
  * `/api/v1/:model/:name` → Returns a `model` record from the database that has the given `name`; expects a `name` parameter.
* `POST`
  * `/api/v1/:model` → Creates a new `model` record in the database; expects a JSON object corresponding to the `model` schema in the request body. This route requires the `create` capability.
* `PUT`
  * `/api/v1/:model/:id` → Modifies a `model` record in the database; expects an `id` parameter and a JSON object corresponding to the `model` schema in the request body. If a record with that `id` does not exist, one is created. This route requires the `update` capability.
* `PATCH`
  * `/api/v1/:model/:id` → Modifies a `model` record in the database; expects an `id` parameter and a JSON object corresponding to the `model` schema in the request body. No new records will be created. This route requires the `update` capability.
* `DELETE`
  * `/api/v1/:model/:id` → Deletes a `model` record in the database that has the given `id`; expects an `id` parameter. This route requires the `delete` capability.

-----

#### `./src/api/v1.events.js`
##### Exported Values and Methods
This module handles the Socket.io events `connection`, `input`, and `disconnect`, rerouting each to appropriate suites of handling functions.

-----

#### `./src/api/command-handlers/about.js`
##### Exported Values and Methods
`about(undefined, socket, io)` → calls `sendToUser` at `./src/api/lib/send-to-user.js` with a preset `message` and the `socket` and `io` arguments it has received.

-----

#### `./src/api/command-handlers/details.js`
##### Exported Values and Methods
`details(undefined, socket, io)` → calls `sendToUser` at `./src/api/lib/send-to-user.js` with a `message` derived from queries to the in-memory population store at `./src/api/lib/population.js` along with the `socket` and `io` arguments it has received.

-----

#### `./src/api/command-handlers/fallback.js`
##### Exported Values and Methods
`fallback(undefined, socket, io)` → calls `sendToUser` at `./src/api/lib/send-to-user.js` with a preset `message` and the `socket` and `io` arguments it has received.

This function is invoked when the user enters an invalid command.

-----

#### `./src/api/command-handlers/help.js`
##### Exported Values and Methods
`help(undefined, socket, io)` → calls `sendToUser` at `./src/api/lib/send-to-user.js` with a preset `message` and the `socket` and `io` arguments it has received.

-----

#### `./src/api/command-handlers/join.js`
##### Exported Values and Methods
`join(arg, socket, io)` → Updates the user's room in the in-memory population store at `./src/api/lib/population.js`. Calls `sendToUser` or `sendToRoom`, as well as the Socket.io methods `socket.join` and `socket.leave`, as appropriate, with descriptive messages, when a user attempts to join a room.

-----

#### `./src/api/command-handlers/launch.js`
##### Exported Values and Methods
`launch(undefined, socket, io)` → calls `sendToUser` at `./src/api/lib/send-to-user.js` with a preset `message` and the `socket` and `io` arguments it has received.

This function is called when `launch` is entered in the client application without an appropriate `url` argument.

-----

#### `./src/api/command-handlers/leave.js`
##### Exported Values and Methods
`leave(undefined, socket, io)` → calls `sendToUser` or `sendToRoom`, as well as the Socket.io methods `socket.join` and `socket.leave`, as appropriate, with descriptive messages, when a user attempts to leave a room to return to the chat lobby.

-----

#### `./src/api/command-handlers/me.js`
##### Exported Values and Methods
`me(arg, socket)` → calls `sendToRoom` with the user's emote `arg`, `room`, and `socket`.

-----

#### `./src/api/command-handlers/msg.js`
##### Exported Values and Methods
`msg(arg, socket, io)` → calls `sendToUser` to a user specified by the first word of the `arg`--the rest of the `arg` is sent as the message--along with the passed `socket` and `io`. If the intended recipient does not exist, a message is sent to the sender instead.

-----

#### `./src/api/command-handlers/nick.js`
##### Exported Values and Methods
`nick(arg, socket io)` → Updates the user's username in the in-memory population store at `./src/api/lib/population.js`. Calls `sendToUser` and `sendToRoom` with templated messages to provide appropriate updates.

-----

#### `./src/api/command-handlers/room.js`
##### Exported Values and Methods
`room(arg, socket io)` → Updates the user's room in the in-memory population store at `./src/api/lib/population.js`. Calls the Socket.io methods `socket.join` and `socket.leave` as appropriate. Calls `sendToUser` and `sendToRoom` with templated messages to provide appropriate updates.

-----

#### `./src/api/event-handlers/handle-command.js`
##### Exported Values and Methods
`handleCommand(line, socket, io)` → This function uses the `parse` and `handlerFinder` helper functions to process commands from the user and handle them with the appropriate command handling function.

-----

#### `./src/api/event-handlers/handle-connection.js`
##### Exported Values and Methods
`handleConnection(socket, io)` → This function uses a `setGreeting` helper function to provide an appropriate response when a user signs on.

-----

#### `./src/api/event-handlers/handle-disconnect.js`
##### Exported Values and Methods
`handleDisconnect(line, socket, io)` → This function cleans up the in-memory store and provide an appropriate response when a user disconnects.

-----

#### `./src/api/event-handlers/handle-input.js`
##### Exported Values and Methods
`handleInput(line, socket, io)` → This function accepts all user input and directs it either to `handleCommand` or `handleMessage` with the appropriate arguments depending on whether it starts with a `/`.

-----

#### `./src/api/event-handlers/handle-message.js`
##### Exported Values and Methods
`handleMessage(line, socket)` → This function calls `sendToRoom` with the appropriate arguments when a user types a non-command message.

-----

#### `./src/api/lib/handler-finder.js`
##### Exported Values and Methods
`handlerFinder(cmd)` → Requires an approprate module based on the `cmd` argument; reverts to a fallback module on error.

-----

#### `./src/api/lib/population-manager.js`
##### Exported Values and Methods
This class contains all of the memory management methods the application uses to keep track of its users and their locations within rooms.

-----

#### `./src/api/lib/population.js`
##### Exported Values and Methods
An instance of the `Population` class from `./src/api/lib/population-manager.js`.

-----

#### `./src/api/lib/send-to-room.js`
##### Exported Values and Methods
`sendToRoom(message, room, socket)` → Creates a Socket.io `output` event to the appropriate room with the given arguments.

-----

#### `./src/api/lib/send-to-user.js`
##### Exported Values and Methods
`sendToRoom(message, socket, io, id)` → Creates a Socket.io `output` event to the user with the given `id` with the given arguments. If no such user exists, the message is directed to the user who initiated the input.

-----

#### `.src/middleware/404.js`
##### Exported Values and Methods
Unknown path fallback middleware.

-----

#### `./src/middleware/500.js`
##### Exported Values and Methods
Server error handling middleware.

-----

#### `./src/middleware/model-finder.js`
##### Exported Values and Methods
This module dynamically evaluates the `model` the `v1` API will use to invoke REST methods in response to various requests to its routes. The `model` is determined by the `:model` parameter on requests to `/api/v1/:model/*`.

The model is expected to be an instance of a class that extends the `ModelClass` from `./src/models/model.model.js`. It is expected to have `get`, `post`, `put`, `patch`, and `delete` methods. 

In this application, `AppInfo` model is used at `./src/models/app-info/app-info.model.js`.

-----

#### `./src/models/model.model.js`
##### Exported Values and Methods
This module exports a `ModelClass` class that can be instantiated with a Mongoose schema. It has the following methods:

* `get(name)` → If a `name` argument is provided, this method will return a Promise that resolves to an array containing matching objects. If no `name` argument is provided, this method will return a Promise that resolves to an array of all the collection's records.
* `post(obj)` → This method takes a record object and returns a Promise that resolves to the posted record, which has been added to the database.
* `patch(id, obj)` → This method takes `id` and `obj` arguments and updates a record with the given `id` with the `obj` in the collection. No new records will be created. The method returns a Promise that resolves to the updated record.
* `put(id, obj)` → This method takes `id` and `obj` arguments and updates a record with the given `id` with the `obj` in the collection. If an object with the given `id` does not exist, it will be created. The method returns a Promise that resolves to the updated record.
* `delete(id)` →  The method takes an `id` argument and returns a Promise that resolves to the deleted record.

-----

#### `./src/models/books/app-info.model.js`
##### Exported Values and Methods
This is an example module to demonstrate how models are dynamically incorporated into the API Server. In the `./src/models/` directory, a directory with the name `{model}` (here, `app-info`) was created. Inside the directory is a file named `{model}.model.js` (here, `app-info.model.js`) that extends the `ModelClass` from `./src/models/model.model.js`.

In this case, the `AppInfo` model extends the `appInfoSchema` schema at `./src/models/app-info/app-info.schema.js`.

Because the `app-info` model has been incorporated into this folder, its methods will be accessible via the endpoint routes. E.g., `/api/v1/app-info` is a valid instance of `/api/v1/{model}`.

-----

#### `./src/models/app-info/app-info.schema.js`
##### Exported Values and Methods
This module defines a mongoose schema `appInfoSchema` with the following properties:
```
  name: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
```
-----

### Setup
#### `.env` 
* `MONGODB_URI` - URL to the running mongo instance/db
* `PORT` - Port number

#### Running the app
* Start a MongoDB database on your local machine that uses the `data` folder.
* Start the server on your local machine with `npm run start` or `npm run watch`.
* Ensure you have appropriate environmental variables set.

###### Populating the `app-info` (or other `{model}`) collection
See the above documentation on the `v1.router.js` for details. For the sake of an example, you can `GET` all the records in the `app-info` collection with the following command to `httpie`:

* `http :3000/api/v1/app-info`

You can `POST` a new application to the collection with:

* `echo '{"name":"Demo", "description": "A good app", "url": "https://www.demo.com"}' | http post :3000/api/v1/app-info`

#### Tests
* How do you run tests?
  * `npm run test`
  * `npm run test-watch`
  * `npm run lint`
* What assertions were made?
Nearly 100 assertions were written. Of those, 73 are complete and passing, yielding a coverage of 87% of lines for all files in the application.

* What assertions need to be / should be made?
Some additional testing of command functions and general Socket.io integration mocking would be in order.

#### UML
Link to an image of the UML for your application and response to events