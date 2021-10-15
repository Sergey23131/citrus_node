import {ErrorHandler} from "../errors";
import {ACCESS} from "../errors/custom_errors";

const userValidator = require('../validators/user.validator');

module.exports = {
    isUserBodyValid: (req, res, next) => {
        try {
            const {error, value} = userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
           next(e);
        }
    },
    checkUserRole: (roleArr = []) => (req, res, next) => {
        try {
            const {role} = req.user;

            if (!roleArr.includes(role)) {
                throw new ErrorHandler(ACCESS.message, ACCESS.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}
