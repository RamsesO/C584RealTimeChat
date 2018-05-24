const User = require('../../../models/User');

module.exports = (req, res) => {
	if(!req.body.user){
		return res.status(201);
	}

	var email = req.body.user.email;
	var password = req.body.user.password;

	console.log(email + " " + password);

	User.findOne({
		'email' : email,
		'password' : password
	}, function(err) {
		if(err)
			return res.status(400);
	})
	.then(function(user) {
		if(user){
			console.log('found user');
			req.session.userId = user._id;
			return res.status(200).send({id: user._id, session_id: req.session.id});
		}
		else{
			console.log('user not found');
			return res.status(404);
		}
	});
}