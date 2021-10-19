const User = require('../database/User');

const {ErrorHandler, errors_massage, errors_code} = require("../errors");

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const info = req.body
            const {email} = info

            const loginInfo = await User.findOne({email});

            if (loginInfo) {
                throw new ErrorHandler(errors_massage.EMAIL_EXIST.message, errors_code.EXIST.code);
            }

            req.body = info

            next();
        } catch (e) {
            next(e);
        }
    }
}