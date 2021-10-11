const Joi = require('joi');

const {EMAIL_REGEXP} = require('../configs/constants');

const userLoginValidator = Joi.object({
    email: Joi
        .string()
        .regex(EMAIL_REGEXP)
        .trim()
        .required(),
    password: Joi
        .string()
        .required()
});

module.exports = {
    userLoginValidator
};
