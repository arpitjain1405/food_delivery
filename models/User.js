const mongoose = require('mongoose');
const Joi = require('joi');

exports.validateUser = function(user){
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(50),
        email: Joi.string().email(),
        password: Joi.string().required().min(6),
        phoneNumber: Joi.string().required().length(10),
        address: Joi.string().min(10)
    })
    return schema.validate(user);
}

exports.validateLogin = function(login){
    const schema = Joi.object({
        phoneNumber: Joi.string().required().length(10),
        password: Joi.string().required().min(6)
    })
    return schema.validate(login);
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    email: {
        type: String
    },
    password: {
        type: String,
        required: true,
        minLength:6
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        minLength: 10,
        maxLength: 10
    },
    address: {
        type: String,
        minLength: 10
    },
    role: {
        type: String,
        required: true,
        enum: ["customer", "restaurant", "admin"],
        default: "customer"
    }
})

exports.User = mongoose.model("User", userSchema);