const User = require('../models/user');

module.exports = {
  index,
  addLineup,
  delLineup,
};

function index(req, res, next) {
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  let sortKey = req.query.sort || 'name';
  User.find(modelQuery)
  .sort(sortKey).exec(function(err, users) {
    if (err) return next(err);
    
    res.render('users/index', {
      users,
      user: req.user,
      name: req.query.name,
      sortKey
    });
  });
}

function addLineup(req, res) {
  req.user.lineups.push(req.body);
  req.user.save(function(err) {
    res.redirect('/users');
  });
}

function delLineup(req, res, next) {
  User.findOne({'lineups._id': req.params.id}, function(err, user) {
    user.lineups.id(req.params.id).remove();
    user.save(function(err) {
      res.redirect('/users');
    });
  });
}
