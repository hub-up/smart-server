'use strict';

const log = require('../log.js');
const chalk = require('chalk');

const about = () => {
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

Joseph Wolfe, Alex White, Spencer 
Hirata, and Aaron Bruce

|￣￣￣￣￣￣|  
|     Eat    |
|    Sleep   |
|    Code    |
|   Hubbub   | 
|＿＿＿＿＿＿|
(\\__/) || 
(•ㅅ•) || 
/ 　  づ

===================================
`;
  log(message);
};

module.exports = about;
