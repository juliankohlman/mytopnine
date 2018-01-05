const express = require('express');


// Routes
const authRoutes = require('./server/routes/auth-routes');
const profileRoutes = require('./server/routes/profile-routes');

// passport setup, sets up strategies
const passportSetup = require('./server/config/passport-setup');
//mongoose ORM for mongodb
const mongoose = require('mongoose');
//some config stuff: Todo :> extract out secrets.
const keys = require('./server/config/keys');

//cookie session ?: in memory database
const cookieSession = require('cookie-session');
// passport
const passport = require('passport');
const bodyParser = require('body-parser');

const User = require('./server/models/user.js');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Express only serves static assets in production
app.use(express.static("./public"));


app.use(bodyParser.json());
const corsOptions = {
  "origin": "http://localhost:3001",
  "methods": "GET, HEAD, PUT, PATCH, POST, DELETE",
  "preflightContinue": true,
  "optionsSuccessStatus": 204,
  "credentials": true // enable set cookie
};
app.use(cors(corsOptions));

// set up temporary view engine. remove once we fully connect to frontend
app.set('view engine', 'ejs');

// cookie session age
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

//


// set up auth routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// create home route
app.get('/', async (req, res) => {
  const user = req.user;
  const users = await User.find({}).exec();
  res.render('home', { user, users});
});


// create calls to users db
app.post('/users', (req, res) => {
  const { _id, username } = req.body;
  const user = new User({_id, username});
  user.save((err, newUser) => {
    if (err) return res.send(err);
    res.json(newUser)
  });
});
// post / update friends list of an individual user
// app.post('/:id', (req, res) => {

// });

app.get('/users', (req, res) => {
  console.log('Hello from app.get /users route!');
  User.find({}, (err, user) => {
    console.log(user);
    if (err) return res.send(err);
    res.json(user);
  });
});


// route to get the friends array of an individual user
app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  User.findOne({_id: id}, (err, user) => {
    if (err) return res.send(err);
    console.log(user);
    res.render('profile', {user});
  });
});


mongoose.connect(keys.mongodb.dbURI, {useMongoClient: true}, (err) => {
  if (err) return console.log(err);
  app.listen(PORT, (err) => {
    if (err) return console.log('ERROR port 3001');
    console.log(`MyTopNine now listening for requests on port ${PORT}`);
  });
  console.log('Connected to MyTopNine DataBase from Server.js!');
});
