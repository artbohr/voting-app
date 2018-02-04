const mongoose = require('mongoose');

const pollSchema = mongoose.Schema({
  pollName: {
    type: String,
    required: true
  },
  options: {
    type: [String],
     required: true
  }
});

const Poll = mongoose.model("Poll", pollSchema);

module.exports = mongoose.model('Poll', pollSchema);
