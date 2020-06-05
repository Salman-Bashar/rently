
const express = require('express');
const router = express.Router();

//Homepage
router.get('/', (req, res) => {
    res.send('Welcome to RENTLY!');
});

module.exports = router;