const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/alltime5',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true //get ride of deprication warning
});

//database connection event
const db = mongoose.connection;

db.on('connected', function(){ //.on an event listener for connection to the db
    console.log(`Connected to MongoDB at ${process.env.DATABASE_URL}`)
});

module.exports = mongoose;