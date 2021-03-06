require('dotenv').config();
const express = require('express');
const session = require('express-session')
const path = require('path');
const mongo = require("mongodb");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const morgan = require('morgan');
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
app.use(morgan('dev'));
app.use(flash());
app.use(cookieParser());

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!User.validPassword(password, user.password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

// Answer API requests.
app.get('/api', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.send('{"message":"Hello from the custom server!"}');
});


// auth
app.post('/api/login',
  passport.authenticate('local', { failureRedirect: '/api', failureFlash : true }),
  function(req, res) {
    
    res.send('works')
});


// register
app.post('/api/register', (req, res) => {
  // check if this username already exists
  User.find({username : req.body.username}, function (err, docs) {
    if (docs.length){
        res.send('Name already exists');
    }else{
      const userForm = new User({username: req.body.username, password: User.generateHash(req.body.password)});
      userForm.save(err=> console.log(err));

      res.send('created')
    }
  });
});

// create a single poll
app.post('/api/createpoll', (req, res) => {
  const pollForm = new Poll({pollName: req.body.pollName, options: req.body.options, votes: new Array(req.body.options.length).fill(0)});
  pollForm.save();

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

  // vote on the poll (use body: voteOn )
  .post((req, res) => {
    Poll.findByIdAndUpdate(
    req.params.id,
    {$inc: {[`votes.${req.body.voteOn}`]: 1 }},
    (err, doc) => {
      console.log(err);
      res.send(doc);
    });
  })

  // modify a poll
  .put((req, res) => {
    Poll.findById(req.params.id, (err, doc) => {
      if (err) res.send(err);

      //doc.pollName = req.body.pollName;
      doc.options = req.body.options;
      doc.save();
      console.log(doc)
      res.send(doc);
    });
  })
  // delete a poll
  .delete((req, res) => {
    Poll.findById(req.params.id, (err, doc) => {
      if (err) res.send(err);

      doc.remove();
      res.send('doc removed ' + doc);
    });
  })


// All remaining requests return the React app, so it can handle routing.
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT,  () => {
  console.log(`Listening on port ${PORT}`);
});
