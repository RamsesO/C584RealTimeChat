const data = require('../../../data.json');

module.exports = (req, res) =>{
	const messages = data.messages;
	res.status(200).json({ messages });
};