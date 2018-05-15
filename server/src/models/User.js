const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name: String,
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
	}
});

UserSchema.statics.authenticate = function(email, password, callback){
	UserModel.findOne({email: email})
	.exec(function(err, user) {
		if(err)
			return callback(err);
		else if(!user){
			var err = new Error('User not found');
			err.status = 401;
			return callback(err);
		}

		if(password == user.password){

			return callback(null, user);
		}
		else{
			return callback();
		}
	});
}

var User = mongoose.model('User', UserSchema);
module.exports = User;