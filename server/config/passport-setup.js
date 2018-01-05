const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy({
    // options for the google strategy
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
  }, async (accessToken, refreshToken, profile, done) => {
    // check if user record already exists in our db

    let user = await User.findOne({googleId: profile.id}).exec();
    if(user) {
      user = user.toObject();
      user.isNewUser = false;
    } else {
      user = await (new User({
        username: profile.displayName,
        googleId: profile.id,
        thumbnail: profile._json.image.url
      }).save());
      user = user.toObject();
      user.isNewUser = true;
    }
    console.log(user);
    done(null, user);  
  })
)