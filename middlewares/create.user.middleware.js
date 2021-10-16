const User = require('../database/User');

const {EMAIL_EXIST} = require("../errors/custom_errors");
const {ErrorHandler} = require("../errors");

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