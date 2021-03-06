const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Genre, validateGenre } = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


//Get all genres
router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

//Get a specific genre
router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id); 
 
    if (!genre) return res.status(404).send('The requested genre is not available. Sorry!');
 
    res.send(genre);
});

//Create a new genre
router.post('/', [auth, admin], async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = new Genre ({ name: req.body.name });
    await genre.save();
    
    res.send(genre);
});

//Update a genre
router.put('/:id', [auth, admin], async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name : req.body.name }, { new: true });
  
    if (!genre) return res.status(404).send('The requested genre is not available. Sorry!');

    res.send(genre);
});

//Delete a genre
router.delete('/:id', [auth, admin], async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
  
    if (!genre) return res.status(404).send('The requested genre is not available. Sorry!');

    res.send(genre);
});

module.exports = router;