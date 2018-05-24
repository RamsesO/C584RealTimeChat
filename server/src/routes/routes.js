var express = require('express');
var router = express();
var cors = require('cors');
var User = require('../models/User');
var Message = require('../models/Message');
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
	// socket.emit('connect');
});

var checkUser = function(user){
	return User.findOne({
		'email' : user.email,
		'password' : user.password
	}, function(err) {
		if(err)
			return handleError(err);
	});
}

router.post('/api/users/register', (req, res) => {
	if(req.body.user){
		var userData = {
			name : req.body.user.name,
			email : req.body.user.email,
			password : req.body.user.password
		};

		User.create(userData, function(err, user) {
			if(err)
				console.log(err);
			else{
				console.log('user inserted');
			}
		});
		return res.json({redirect:'/login'});
	}
	else
		return res.json({redirect:'/register'})
});

router.post('/api/users/login', (req, res) => {
	checkUser({'email': req.body.email, 'password': req.body.password})
	.then(function (user) {
		if(user){
			console.log('found user');
			req.session.userId = user._id;
			console.log(req.session.id);
			res.status(200).send({id: user._id, session_id: req.session.id});
		}
		else{
			console.log('user not found');
			res.sendStatus(404);
		}
	});
});

router.get('/api/user', function(req, res){
	var user_id = req.query.id;
	User.findOne({_id: user_id})
	.exec(function(err, user){
		if(err)
			return err;
		else{
			return res.json(user);
		}
	})
});
router.post('/api/user', function(req, res){
	User.find({_id : req.body.id})
	.exec(function (err, user){
		if(err){
			console.log(err);
			return err;
		}
		else{
			if(!user){
				var error = new Error('user not found from id');
				error.status = 400;
				return res.json({error: error, found: false});
			}
			else{
				return res.json({found: true});
			}
		}
	})
});

router.post('/api/messages', function(req, res){

	if(req.body.text.trim() != ''){
		var messageData = {
			sender: req.body.sender,
			receiver: req.body.receiver,
			text: req.body.text
		};

		Message.create(messageData, function(err, message){
			if(err)
				console.log(err);
			else{
				//emit the message to everyone in the room
				console.log('message inserted');
				return res.json({success : true});
			}
		})
	}
	
	
})
router.get('/api/messages/user', function(req, res){
	var user_id = req.query.id;
	Message.find({
		$or:
			[
				{sender: user_id },
				{receiver: user_id}
			]
		})
	.sort({
		'createdAt': -1
	})
	.limit(50)
	.exec(function (err, messages){
		if(err)
			return err;
		else{
			return res.json({messages: messages});
		}
	})
});

router.get('/dashboard', function (req, res){
	User.findById(req.session.userId)
	.exec(function (err, user){
		if(err){
			return err;
		}
		else{
			if(!user){
				var error = new Error('Not logged in');
				error.status = 400;
				return res.json({error: error, loggedin:false});
			}
			else{
				return res.json({loggedin: true});
			}
		}
	})
});

router.get('/api/users/all', function (req, res){
	User.find({})
	.exec(function (err, users){
		if(err)
			return err;
		else{
			return res.json({users: users});
		}
	})
});

router.get('/logout', function(req, res){
	if(req.session){
		req.session.destroy(function(err) {
			if(err)
				return res.sendStatus(404);
			else
				return res.sendStatus(200);
		})
	}
});


module.exports = router;