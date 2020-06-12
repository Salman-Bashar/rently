const express = require('express');
const app = express();
const port = process.env.port || 3000;

require('./startup/config')();
require('./startup/db')();
require('./startup/prod')(app);
require('./startup/routes')(app);
require('./startup/validation')();

const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = server;