const Message = require('../../../models/Message');

module.exports = (req, res) =>{
	if(req.body.text.trim() != ''){
		var messageData = {
			sender: req.body.sender,
			receiver: req.body.receiver,
			text: req.body.text
		};

		Message.create(messageData, function(err, message){
			if(err){
				console.log(err);
				return res.status(400).json({err});
			}
			else{
				//emit the message to everyone in the room
				console.log('message inserted');
				return res.status(201);
			}
		})
	}
}