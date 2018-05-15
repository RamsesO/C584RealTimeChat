const messages = require('express').Router();
const findObject = require('../../FindObject');
const single = require('./single');
const all = require('./all');

messages.param('userId', findObject('user'));

messages.get('/:userId', single);
messages.get('/', all);

module.exports = messages;