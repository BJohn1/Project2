var express = require('express');
var router = express.Router();
var usersCtrl = require('../controllers/users');

/* GET users listing. 
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/

// GET /students
router.get('/users', usersCtrl.index);

// POST /facts
// We will already have access to the logged in student on
// the server, therefore do not use: /students/:id/facts
router.post('/lineups', isLoggedIn, usersCtrl.addLineup);

// DELETE /facts/:id
router.delete('/lineups/:id', usersCtrl.delLineup);

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;




