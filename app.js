
const mongoose = require('mongoose');
const home = require('./routes/home');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const express = require('express');
const app = express();
const port = process.env.port || 3000;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost/rently')
    .then(() => console.log('Connected to Mongodb...'))
    .catch(err => console.error('Error', err.message));

app.use(express.json());
app.use('/', home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);

app.listen(port, () => console.log(`Listening on port ${port}...`));