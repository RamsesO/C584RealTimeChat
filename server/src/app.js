// mongodb initialization
var mongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var url = 'mongodb://localhost:27017';
var dbName = 'chatdb';
mongoose.connect(url + '/' + dbName);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});

app.use(session({
	secret: 'chat',
	resave: true,
	saveUninitialized: false,
	store: new MongoStore({
		mongooseConnection: db
	})
}));


const User = require('./models/User');
const Message = require('./models/Message');
// const routes = require('./routes');
const routes = require('./routes/index.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use('/', routes);


app.listen(8081, () => console.log('listening'));