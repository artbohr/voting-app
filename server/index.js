require('dotenv').config();
const express = require('express');
const path = require('path');
const mongo = require("mongodb");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;

// passport
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//models
const Poll = require('./models/poll');
const User = require('./models/user');

// connect to db
mongoose.connect(process.env.MONGO_URI);

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// middleware
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

// Answer API requests.
app.get('/api', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.send('{"message":"Hello from the custom server!"}');
});

// auth
app.post('/api/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);
/*
// register
app.post('/api/register', (req, res) => {
  const userForm = new User({username: req.body.username, password: req.body.password});
  userForm.save(err=> console.log(err));

  res.status(201).send("created " + userForm.username);
});
*/
// create a single poll
app.post('/api/createpoll', (req, res) => {
  const pollForm = new Poll({pollName: req.body.pollName, options: req.body.options});
  pollForm.save(err=> console.log(err));

  res.status(201).send("saved " + pollForm);
});

// show all polls
app.get('/api/polls', (req, res) => {
  Poll.find({})
    .then(doc=> res.send(doc))
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
