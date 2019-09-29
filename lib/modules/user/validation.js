const Joi = require('joi');

exports.validate = (data) => {
    const schema = {
        firstName: Joi.string().min(5).max(25).required().trim(),
        lastName: Joi.string().min(5).max(25).required().trim(),
        email: Joi.string().email().min(5).max(50).required().trim(),
        password: Joi.string().min(8).max(250).required().trim(),
        phone: Joi.string().min(8).max(15).trim()
    }
    return Joi.validate(data, schema);
}