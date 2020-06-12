
const mongoose = require('mongoose');
const config = require('config');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

module.exports = function() {
  const db = config.get('db');
  mongoose.connect(db)
    .then(() => console.log('Connected to Mongodb...'))
    .catch(err => console.error('Error', err.message));
}