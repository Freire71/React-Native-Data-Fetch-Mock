/* eslint-disable no-undef */
// src/setupTests.js
import 'whatwg-fetch';
global.self = global;
global.window = global.window;
global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
