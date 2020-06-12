const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        minlength: 5, 
        maxlength: 50
    },
    phone: {
        type: String, 
        required: true, 
        minlength: 11, 
        maxlength: 11
    },
    isGold: { 
        type: Boolean, 
        default: false
    }
});

const Customer = mongoose.model('Customer', customerSchema);


//Function to validate Customer
function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(11).max(11).required(),
        isGold: Joi.boolean()
    };
    return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validateCustomer = validateCustomer;
exports.customerSchema = customerSchema;