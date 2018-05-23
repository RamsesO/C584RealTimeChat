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


var User = require('./models/User');
var Message = require('./models/Message');
var routes = require('./routes/routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use('/', routes);


app.listen(8080, () => console.log('listening'));