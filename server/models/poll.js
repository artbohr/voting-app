const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const test = mongoose.model("test", testSchema);


module.exports = mongoose.model('poll', testSchema);
