const User = require('../../../models/User');

module.exports = (req, res) => {
	const userId = req.params.userId;
	User.findOne({_id: userId})
	.exec(function(err, user){
		if(err){
			console.log(err);
			return res.status(400).json({err});
		}
		else{
			console.log('getting user with id: ' + userId);
			return res.status(200).json({user});
		}
	})
};