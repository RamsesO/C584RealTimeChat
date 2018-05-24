const users = require('express').Router();
const all = require('./all');
const single = require('./single');
const register = require('./register');
const login = require('./login');

users.get('/', all);
users.get('/:userId', single);
users.post('/register', register);
users.post('/login', login);

module.exports = users;