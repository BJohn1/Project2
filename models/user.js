const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    comment: String,
},{
    timestamps: true
});

const lineupSchema = new Schema({
    teamName: String,
    comment: [commentSchema],
    pointGuard:{type: String, enum: ['AUS', 'DAL', 'LAX', 'SEA']},
    shootingGuard:{type: String, enum: ['AUS', 'DAL', 'LAX', 'SEA']},
    smallForward:{type: String, enum: ['AUS', 'DAL', 'LAX', 'SEA']},
    powerForward:{type: String, enum: ['AUS', 'DAL', 'LAX', 'SEA']},
    center:{type: String, enum: ['AUS', 'DAL', 'LAX', 'SEA']},
},{
    timestamps: true
});

const userSchema = new Schema({
    name: String,
    email: String, 
    lineupName: String,
    avatar: String,
    lineups: [lineupSchema],
    comments: [commentSchema],
    googleId: String,
    },
    {
    timestamps: true
    });

module.exports = mongoose.model("User", userSchema)