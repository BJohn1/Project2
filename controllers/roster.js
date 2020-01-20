const Flight = require('../models/flight')
const Ticket = require('../models/ticket')


const newFlight= (req, res) =>{
    res.render('flights/new')
}

const create= (req, res) =>{
    //remove whitespace next to commas
    //req.body.airline=req.body.airline.replace(/\s*,\s*/g, ',')
    //split if it's not an empty string
    //if (req.body.cast) req.body.airline = req.body.airline.split(',')
    for(let key in req.body){
        if (req.body[key]==='') delete req.body[key]
    }
    const flight= new Flight(req.body)
    flight.save(err =>{
        if(err) {
            return res.redirect('/flights/new')
        }
        else res.redirect('/flights')
        //console.log(err)
    })
} 


const index= (req, res) =>{
    Flight.find({}, (err,flights)=>{
        if(err){
            return res.redirect('/flights/new')
        } 
        else{
            res.render('flights/index',{
                flights
            });
        }
    })
}

const show = (req, res) => {
    Flight.findById(req.params.id) 
    .populate('ticket')
    .exec((err,flight)=> {
    Ticket.find({}, (err, tickets) => {
      res.render('flights/show', { 
        title: 'Ticket Detail',
        flight,
        tickets,
      });
    });
  })
}

  const filter= (req, res) =>{
    Flight.find({}, (err,flights)=>{
        if(err){
            return res.redirect('/flights/new')
        } 
        else{
            const sortedFlights = flights.sort((a, b) => (a.departs > b.departs) ? 1 : -1)
            res.render('flights/filter',{
                flights: sortedFlights
            });
           
        }
    })
}

const deleteFlight = (req, res) =>{
    Flight.findByIdAndDelete({_id:req.params.id}, (err,flight)=>{
        console.log(flight)
        if(err){
            return res.redirect('/flights')
        } 
        else{
            res.redirect('/flights');
             
        }
    })
}

module.exports = {
    new: newFlight,
    create,
    filter,
    show,
    index,
    delete: deleteFlight,
}