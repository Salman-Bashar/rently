const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genre');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    inStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
});

const Movie = mongoose.model('Movie', movieSchema);


//Function to Validate movie
function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(5).max(255).required(),
        genreId: Joi.objectId().required(),
        inStock: Joi.number().min(0).max(255).required(),
        dailyRentalRate: Joi.number().min(0).max(255).required()
    };
    return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validateMovie = validateMovie;
exports.movieSchema = movieSchema;