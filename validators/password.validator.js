const Joi = require('joi');

const {PASSWORD_REGEXP} = require('../configs/constants');

const userPasswordValidator = Joi.object({
    password: Joi
        .string()
        .regex(PASSWORD_REGEXP)
        .required()
});

module.exports = {
    userPasswordValidator
};
