const messages = require('express').Router();
const single = require('./single');
const all = require('./all');

messages.get('/:userId', single);
messages.get('/', all);

module.exports = messages;