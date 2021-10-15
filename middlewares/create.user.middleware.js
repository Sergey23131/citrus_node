import {ErrorHandler} from "../errors";
import {EMAIL_EXIST} from "../errors/custom_errors";

const User = require('../database/User');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;

            const loginInfo = await User.findOne({email});

            if (loginInfo) {
                throw new ErrorHandler(EMAIL_EXIST.message, EMAIL_EXIST.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}