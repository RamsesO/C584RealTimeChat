const User = require('../../../models/User');

module.exports = (req, res) => {
	User.find({})
	.exec(function (err, users){
		if(err)
			return res.status(400).json({err});
		else{
			return res.status(200).json({users: users});
		}
	})
}