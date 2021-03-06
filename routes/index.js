var express = require('express');
var router = express.Router();
const passport = require('passport')


router.get('/', function(req, res, next) {
  res.render('index', { title: 'All Time Starting 5' });
});

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get(
  '/oauth2callback',
  passport.authenticate('google', {
    successRedirect: '/users',
    failureRedirect: '/users',
  })
)

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users')
})


module.exports = router;
