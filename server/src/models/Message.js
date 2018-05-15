const mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
	sender: {
		type: String,
		required: true
	},
	receiver: {
		type: String,
		required: true
	},
	text: {
		type: String,
		required: true
	}
}, {
	timestamps: true
});

var Message = mongoose.model('Message', MessageSchema);
module.exports = Message;