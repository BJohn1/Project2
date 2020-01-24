var express = require('express');
var router = express.Router();
var usersCtrl = require('../controllers/users');


router.get('/users', usersCtrl.index);


router.post('/lineups', isLoggedIn, usersCtrl.addLineup);


router.delete('/lineups/:id', usersCtrl.delLineup);

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;




