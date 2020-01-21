const User = require('../models/user');

module.exports = {
  index,
  addLineup,
  delLineup,
};

function index(req, res, next) {
  console.log(req.query)
  // Make the query object to use with Student.find based up
  // the user has submitted the search form or now
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  // Default to sorting by name
  let sortKey = req.query.sort || 'name';
  User.find(modelQuery)
  .sort(sortKey).exec(function(err, users) {
    if (err) return next(err);
    // Passing search values, name & sortKey, for use in the EJS
    res.render('users/index', {
      users,
      user: req.user,
      name: req.query.name,
      sortKey
    });
  });
}

function addLineup(req, res, next) {
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
