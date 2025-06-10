const mongoose = require('mongoose');
const Joi = require('joi');

exports.validateCuisine = function(cuisine){
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(30)
    })
    return schema.validate(cuisine);
}

const cuisineSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 30
    }
})

exports.Cuisine = mongoose.model('Cuisine', cuisineSchema);