var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	console.log('api/user');
	res.send('api/user');
});
router.post('/api/user', function(req, res, next) {
	console.log('api/user');
});
const users = require('express').Router();
const findObject = require('../../FindObject');
// const insertUser = function(db, callback) {
// 	const collection = db.collection('documents');
// 	collection.insert
// }
// messages.param('userId', findObject('user'));

// message.get('/:userId/:otherId', single);
// message.get('/', all);

module.exports = users;