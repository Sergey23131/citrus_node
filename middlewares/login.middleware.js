const User = require('../database/User');
const loginValidator = require('../validators/login.validator');

const {ErrorHandler,errors_massage,errors_code} = require("../errors");

module.exports = {
    createLoginMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;

            const loginInfo = await User.findOne({email});

            if (!loginInfo) {
                throw new ErrorHandler(errors_massage.NOT_VALID_BODY, errors_code.NOT_VALID);
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
                throw new ErrorHandler(errors_massage.NOT_VALID_BODY, errors_code.NOT_VALID);
            }

            req.body = value;

            next();
        } catch (e) {
           next(e);
        }
    },
}