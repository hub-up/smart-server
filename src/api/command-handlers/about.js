'use strict';

const sendToUser = require('../lib/send-to-user.js');

/***
 * See information about the project and development team
 * @function
 * @name fallback
 * @param undefined {undefined} Unused parameter
 * @param socket {object} The socket object from the client event
 * @param io {object} The server-side Socket.io instance
 */
const about = (undefined, socket, io) => {
  const message = `
==================================
_        _    _         _    
| |_ _  _| |__| |__ _  _| |__ 
| ' \\ || | '_ \\ '_ \\ || | '_ \\
|_||_\\_,_|_.__/_.__/\\_,_|_.__/
                              
==================================

The Hubbub team is proud to launch
the Hubbub platform, including the
Hubbub Community Client and Hubbub
Chat. We are:

Joseph Wolfe, Alex White, and 
Spencer Hirata

|￣￣￣￣￣￣|  
|     Eat    |
|    Sleep   |
|    Code    |
|   Hubbub   | 
|＿＿＿＿＿＿|
(\\__/) || 
(•ㅅ•) || 
/     づ

===================================
`;
  sendToUser(message, socket, io);
};

module.exports = about;
