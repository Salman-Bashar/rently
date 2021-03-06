
const auth = require('../middleware/auth');
const { Customer, validateCustomer } = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


//Get all customers
router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

//Get a specific customer
router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id); 
 
    if (!customer) return res.status(404).send('No customer found for this ID. Sorry!');
 
    res.send(customer);
});

//Create a new customer
router.post('/', auth, async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = new Customer ({ 
        name: req.body.name,
        phone: req.body.phone, 
        isGold: req.body.isGold 
    });
    await customer.save();
    
    res.send(customer);
});

//Update a customer
router.put('/:id', auth, async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer
        .findByIdAndUpdate(req.params.id, 
            { 
                name : req.body.name,  
                phone: req.body.phone, 
                isGold: req.body.isGold
            }, { new: true });
  
    if (!customer) return res.status(404).send('No customer found for this ID. Sorry!');

    res.send(customer);
});

//Delete a customer
router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
  
    if (!customer) return res.status(404).send('No customer found for this ID. Sorry!');

    res.send(customer);
});

module.exports = router;