const User = require('../models/user')

const create = (req,res)=>{
    console.log(req.params.id)
    User.find({'lineups._id' : req.params.id }, (err,lineup)=>{
        const userLineup = lineup[0]
        const foundLineup = userLineup.lineups.filter(l => l._id.toString() === req.params.id)[0]
        foundLineup.comment.push(req.body)
        console.log(userLineup)
        // // console.log(lineup)
        userLineup.save(err=>{
            res.redirect(`/comments/show/${req.params.id}`)
        })
    })
}

const show = (req, res) => {
    User.find({'lineups._id' : req.params.id }, (err,lineup)=>{
        const userLineup = lineup[0]
        const foundLineup = userLineup.lineups.filter(l => l._id.toString() === req.params.id)[0]
        //console.log(foundLineup)
        res.render('comments/show', {
            id: req.params.id,
            lineup: foundLineup

        })
    })

}

const delComment = (req, res) => {
    User.findById(req.user._id, async (err, user) => {
        if(err) {
            console.log(err);
        }
        const hi = user.lineups.id(req.params.id);
        hi.comment = hi.comment.filter(c => c._id.toString() !== req.body.commentId)
        // console.log(hi)
        await user.save();
        res.redirect(`/comments/show/${req.params.id}`);
    })
   //console.log(req.body.commentId);
}
  

module.exports={
    create,
    show,
    delete: delComment,
}