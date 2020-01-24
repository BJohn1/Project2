const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments')

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }

router.get('/show/:id', commentsCtrl.show)

router.get('/edit/:id', commentsCtrl.edit)

router.post('/lineupcomment/:id', isLoggedIn, commentsCtrl.create);

router.delete('/lineupcomment/:id', commentsCtrl.delete);

 module.exports = router; 


 
