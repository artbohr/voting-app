require('dotenv').config();
const express = require('express');
const path = require('path');
const mongo = require("mongodb");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI);
// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

const testSchema = mongoose.Schema({
  term: {
    type: String,
    required: true
  }
});

const test = mongoose.model("test", testSchema);

// Answer API requests.
app.get('/api', function (req, res) {
  const testForm = new test({term: "testingDB"});
  testForm.save();

  res.set('Content-Type', 'application/json');
  res.send('{"message":"Hello from the custom server!"}');
});

app.get("/api/test", (req, res) => {
  test.find({})
    .then(doc=> res.json(doc))
    .catch(err=> res.send({message: err}))

});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
