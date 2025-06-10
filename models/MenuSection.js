const mongoose = require('mongoose');
const Joi = require('joi');

exports.validateMenuSection = function(menuSection){
    const schema = Joi.object({
        title: Joi.string().required().min(3).max(50),
    })
    return schema.validate(menuSection);
}

const menuSectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    }
})

exports.MenuSection = mongoose.model('MenuSection', menuSectionSchema);