const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments')

router.get('/show/:id', (req,res)=>{
    res.render('comments/show')
})

router.post('/lineups/:id/comments',commentsCtrl.create);

 module.exports = router; 