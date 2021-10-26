const Joi = require('joi');

const {EMAIL_REGEXP} = require('../configs/constants');

const userEmailValidator = Joi.object({
    email: Joi
        .string()
        .regex(EMAIL_REGEXP)
        .trim()
        .required()
});

module.exports = {
    userEmailValidator
};