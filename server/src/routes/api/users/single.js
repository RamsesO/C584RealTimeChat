const User = require('../../../models/User');

module.exports = (req, res) => {
	const userId = req.params.userId;
	User.findOne({_id: userId})
	.exec(function(err, user){
		if(err)
			return res.status(400).json({err});
		else{
			return res.status(200).json({user});
		}
	})
};