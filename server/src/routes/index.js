const router = require('express').Router();
const users = require('./api/users');
const messages = require('./api/messages');
var cors = require('cors');

router.use(cors());
router.use('/users', users);
router.use('/messages', messages);

module.exports = router;
