const router = require('express').Router();
const users = require('./api/users');
const messages = require('./api/messages');
var cors = require('cors');

router.use(cors());

// socket stuff
var server = require('http').createServer();
var io = require('socket.io')(server, {path: '/socket.io'});
server.listen(3000);

io.on('connection', function(socket) {
	console.log('a user has connected');
	socket.join('room1');
	console.log('number of people in room is ' + io.sockets.adapter.rooms['room1'].length);
	socket.on('customEmit', function(data){
		console.log('received custom emit');
		socket.emit('roomConnect');
	});

	socket.on('sendNewMessage', function(data){
		socket.in('room1').emit('newMessage', data);
	})
});

router.use('/api/users', users);
router.use('/api/messages', messages);


module.exports = router;
