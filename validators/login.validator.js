const Joi = require('joi');

const userLoginValidator = Joi.object({
    email: Joi
        .string()
        .trim()
        .required(),
    password: Joi
        .string()
        .required()
});

module.exports = {
    userLoginValidator
};
