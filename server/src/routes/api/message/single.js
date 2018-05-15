const data = require('../../../data.json');
module.exports = (req, res) => {
	const message = req.message;
	res.status(200).json({ message });
};