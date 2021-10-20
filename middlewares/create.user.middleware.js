const User = require('../database/User');

const {ErrorHandler, errors_massage, errors_code} = require("../errors");

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {

            const {email} = req.body

            const loginInfo = await User.findOne({email});

            if (loginInfo) {
                throw new ErrorHandler(errors_massage.EMAIL_EXIST, errors_code.EXIST);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}
