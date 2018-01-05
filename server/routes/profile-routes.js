const router = require('express').Router();

// middleware that determines whether to display user profile page
const authCheck = (req, res, next) => {
  if(!req.user){
    // if user is not logged in, redirect to login screen
    res.redirect('/auth/login');
  } else {
    next();
  }
};

// if a user is logged in, return the current user object
router.get('/current_user', (req, res) => {
  console.log('CurrUSERR: ', req.user);
  res.send(req.user);
});

router.get('/', authCheck, (req, res) => {
  console.log(req.user);
  res.render('profile', { user: req.user });
});

module.exports = router;