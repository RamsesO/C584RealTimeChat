const Message = require('../../../models/Message');

module.exports = (req, res) =>{
	Message.find({})
	.exec(function (err, messages){
		if(err)
			return res.status(400).json({err});
		else{
			return res.status(200).json({messages: messages});
		}
	})
};