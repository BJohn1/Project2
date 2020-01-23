const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments')

router.get('/', (req,res)=>{
    res.redirect('/lineups/show')
})

router.post('/lineups/:id/comments',commentsCtrl.create);

 module.exports = router; 