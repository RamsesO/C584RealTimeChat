const Message = require('../../../models/Message');

module.exports = (req, res) =>{
	const userId = req.params.userId;
	console.log('finding messages of user id: ' + userId);
	Message.find({
		$or:
			[
				{sender: userId },
				{receiver: userId}
			]
		})
	.sort({
		'createdAt': -1
	})
	.limit(50)
	.exec(function (err, messages){
		if(err)
			return res.staus(400).json({err});
		else{
			if(messages.length != 0){
				return res.status(200).json({messages: messages});
			}
			else{
				return res.status(404).send('no messages exist');
			}
		}
	})
};