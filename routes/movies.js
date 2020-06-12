const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Movie, validateMovie } = require('../models/movie');
const { Genre } = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


//Get all movies
router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
});

//Get a specific movie
router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id); 
 
    if (!movie) return res.status(404).send('The requested movie is not available. Sorry!');
 
    res.send(movie);
});

//Create a new movie
router.post('/', [auth, admin], async (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre!');

    const movie = new Movie (
        { 
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            inStock: req.body.inStock,
            dailyRentalRate: req.body.dailyRentalRate
        });
    await movie.save();
    
    res.send(movie);
});

//Update a movie
router.put('/:id', [auth, admin], async (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre!');

    const movie = await Movie.findByIdAndUpdate(req.params.id, 
        { 
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            inStock: req.body.inStock,
            dailyrentalRate: req.body.dailyrentalRate
        }, { new: true });
  
    if (!movie) return res.status(404).send('The requested movie is not available. Sorry!');

    res.send(movie);
});

//Delete a movie
router.delete('/:id', [auth, admin], async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
  
    if (!movie) return res.status(404).send('The requested movie is not available. Sorry!');

    res.send(movie);
});

module.exports = router;