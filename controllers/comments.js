const User = require('../models/user')

const create = (req,res)=>{
    User.find({'lineups._id' : req.params.id }, (err,lineup)=>{
        const userLineup = lineup[0]
        const foundLineup = userLineup.lineups.filter(l => l._id.toString() === req.params.id)[0]
        foundLineup.comment.push(req.body)
        userLineup.save(err=>{
            res.redirect(`/comments/show/${req.params.id}`)
        })
    })
}

const show = (req, res) => {
    User.find({'lineups._id' : req.params.id }, (err,lineup)=>{
        const userLineup = lineup[0]
        const foundLineup = userLineup.lineups.filter(l => l._id.toString() === req.params.id)[0]
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
        await user.save();
        res.redirect(`/comments/show/${req.params.id}`);
    })
}

const edit = (req, res) => {
    res.render('comments/edit',{
        id: req.params.id,
        user: req.user,
    })
}

const update = (req, res) => {
    req.user.lineups.forEach((l,idx) => {
        l.comment.forEach((c, ix) => {
            if(req.params.id == c._id){
                c.comment = req.body.comment;
                req.user.save();
                res.redirect(`/comments/show/${l._id}`);
            }
        })
    })
} 

module.exports={
    create,
    show,
    delete: delComment,
    edit,
    update,
}