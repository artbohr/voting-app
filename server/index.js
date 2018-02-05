require('dotenv').config();
const express = require('express');
const path = require('path');
const mongo = require("mongodb");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;

//models
const Poll = require('./models/poll');

// connect to db
mongoose.connect(process.env.MONGO_URI);

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// middleware
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Answer API requests.
app.get('/api', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.send('{"message":"Hello from the custom server!"}');
});

// create a single poll
app.post('/api/createpoll', (req, res) => {
  const pollForm = new Poll({pollName: req.body.pollName, options: req.body.options});
  pollForm.save(err=> console.log(err));

  res.status(201).send("saved " + pollForm);
});

// show all polls
app.get('/api/polls', (req, res) => {
  Poll.find({})
    .then(doc=> res.json(doc))
    .catch(err=> res.send({message: err}));
});

// perform operations based on poll id
app.route('/api/poll/:id')
  // find poll
  .get((req, res) => {
    Poll.findById(req.params.id, (err, doc) => {
      if (err) res.send(err);

      res.send(doc);
    });
  })
  // vote on the poll
  .post((req, res) => {
    Poll.findById(req.params.id, (err, doc) => {
      // do something
      console.log('voting')
    });
  })
  // modify a poll
  .put((req, res) => {
    Poll.findById(req.params.id, (err, doc) => {
      if (err) res.send(err);

      doc.pollName = req.body.pollName;
      doc.options = req.body.options;
      doc.save();
      res.send(doc);
      console.log('modifying');
    });
  })
  // delete a poll
  .delete((req, res) => {
    Poll.findById(req.params.id, (err, doc) => {
      if (err) res.send(err);

      doc.remove();
      res.send('doc removed ' + doc);
      console.log('deleting');
    });
  })


// All remaining requests return the React app, so it can handle routing.
app.get('*', (req, res) => {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT,  () => {
  console.log(`Listening on port ${PORT}`);
});
