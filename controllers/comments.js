const User = require('../models/user')

const create = (req,res)=>{
    User.lineups.findById(req.params.id, (err,lineup)=>{
        lineup.comment.push(req.body)
        lineup.save(err=>{
            res.redirect(`/lineups/${lineup._id}`)
        })
    })
}

module.exports={
    create,
}