const messages = require('express').Router();
const single = require('./single');
const sendSingle = require('./sendSingle');
const all = require('./all');

messages.get('/user/:userId', single);
messages.get('/', all);
messages.post('/', sendSingle);

module.exports = messages;