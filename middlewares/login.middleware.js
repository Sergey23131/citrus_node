import {ErrorHandler} from "../errors";
import {NOT_VALID_BODY} from "../errors/custom_errors";

const User = require('../database/User');
const loginValidator = require('../validators/login.validator');

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
}