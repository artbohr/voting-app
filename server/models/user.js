const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');

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


const User = module.exports = mongoose.model('User', userSchema);

module.exports.validPassword = function(password, userPassword){
	return bcrypt.compareSync(password, userPassword);
}

module.exports.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
};
