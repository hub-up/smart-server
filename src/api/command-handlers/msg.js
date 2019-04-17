'use strict';

const msg = arg => {
  const recipient = arg.match(/[a-z]+\b/i)[0];
  const message = arg.slice(recipient.length, arg.length);

  return `Direct message to ${recipient}: ${message}`;
};

module.exports = msg;
