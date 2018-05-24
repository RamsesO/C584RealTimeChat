const User = require('../../../models/User');

module.exports = (req, res) => {
	if(req.body.user){
		var userData = {
			name : req.body.user.name,
			email : req.body.user.email,
			password : req.body.user.password
		};

		User.create(userData, function(err, user) {
			if(err){
				console.log('error:' + err);
				return res.status(400);
			}
			else{
				console.log('user inserted');
				return res.status(200);
			}
		});
	}
	else
		return res.status(404);
}