'use strict';

// TODO: Why does this not show the argument in the client?
const fallback = arg => `/${arg} does not match any known commands.`;

module.exports = fallback;
