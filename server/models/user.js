const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});


const User = mongoose.model("User", userSchema);

module.exports = mongoose.model('User', userSchema);


module.exports.validPassword = function(pwd, user){
	return pwd == user.password;
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}
