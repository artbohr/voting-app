const mongoose = require('mongoose');

const pollSchema = mongoose.Schema({
  pollName: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true
  },
  votes: []
});

const Poll = mongoose.model("Poll", pollSchema);

module.exports = mongoose.model('Poll', pollSchema);
