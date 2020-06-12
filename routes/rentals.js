
const auth = require('../middleware/auth');
const { Rental, validateRental } = require('../models/rental');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const Fawn = require('fawn');                                       //Transaction security
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

Fawn.init(mongoose);

//Get all rentals
router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

//Get a specific rental
router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id); 
 
    if (!rental) return res.status(404).send('No rental information found.');
 
    res.send(rental);
});

//Create a new rental
router.post('/', auth, async (req, res) => {
    const { error } = validateRental(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('No customer found for this id.');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('No movie found.');

    if (movie.inStock === 0) return res.status(400).send('Out of stock.');

    const rental = new Rental (
        { 
            customer: {
                _id: customer._id,
                name: customer.name,
                phone: customer.phone
            },
            movie: {
                _id: movie._id,
                title: movie.title,
                dailyRentalRate: movie.dailyRentalRate
              }
        });
    
    try {
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', { _id: movie._id }, {
                $inc: { inStock: -1 }
            })
            .run();

        res.send(rental);
    }
    catch (ex) {
        res.status(500).send('Something failed!');
    }
});

module.exports = router;