const express = require('express');
const authRoutes = require('./server/routes/auth-routes');
const profileRoutes = require('./server/routes/profile-routes');
const passportSetup = require('./server/config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./server/config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const Card = require('./server/models/user.js');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("./public/build"));
}

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
mongoose.connect(keys.mongodb.dbURI, {useMongoClient: true}, (err) => {
  if (err) return console.log(err);
  console.log('Connected to MyTopNine DataBase from Server.js!');
});

// set up auth routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// create home route
app.get('/', (req, res) => {
  res.render('home', { user: req.user});
});


// create calls to cards db
app.post('/cards', (req, res) => {
  const { _id, frontCard, backCard } = req.body;
  const card = new Card({_id, frontCard, backCard});
  card.save((err, newCard) => {
    if (err) return res.send(err);
    res.json(newCard)
  });
});

app.get('/cards', (req, res) => {
  console.log('Hello from app.get /cards route!');
  Card.find({}, (err, card) => {
    console.log(card);
    if (err) return res.send(err);
    res.json(card);
  });
});

app.listen(PORT, (err) => {
  if (err) return console.log('ERROR port 3001');
  console.log(`MyTopNine now listening for requests on port ${PORT}`);
});