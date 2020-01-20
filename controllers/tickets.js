const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

const newTicket = (req, res) => {
    Flight.findById(req.params.id, (err, flight) => {
      if(flight.ticket.includes(req.body.ticketId)) {
        res.redirect(`/flights/${flight._id}`)
      } else {
        flight.ticket.push(req.body.ticketId)
        flight.save(err => {
            res.redirect(`/flights/${flight._id}`)
        })
      }
    })
  }

const create = (req,res)=>{
    Ticket.create(req.body, (err, ticket) => {
        res.redirect('/tickets/new')
      })
}

const showTicket = (req, res) => {
    Ticket.find({}, (err, tickets) => {
      res.render('tickets/new', {
        title: 'Add Ticket',
        tickets,
      })
    })
  }

module.exports={
    new: newTicket,
    create,
    showTicket,
}