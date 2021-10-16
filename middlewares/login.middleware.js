const User = require('../database/User');
const loginValidator = require('../validators/login.validator');
const {jwtService} = require("../services");
const {AUTHORIZATION} = require("../configs/constants");

const {NOT_VALID_BODY} = require("../errors/custom_errors");
const {ErrorHandler} = require("../errors/");

module.exports = {
    createLoginMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;

            const loginInfo = await User.findOne({email});

            if (!loginInfo) {
                throw new ErrorHandler(NOT_VALID_BODY.message, NOT_VALID_BODY.code);
            }

            req.user = loginInfo;

            next();
        } catch (e) {
            next(e);
        }
    },

    isloginBodyValid: (req, res, next) => {
        try {
            const {error, value} = loginValidator.userLoginValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(NOT_VALID_BODY.message, NOT_VALID_BODY.code);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            await jwtService.verifyToken(token);

            next();
        } catch (e) {
            next(e);
        }
    },
}