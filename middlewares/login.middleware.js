const User = require('../database/User');
const loginValidator = require('../validators/login.validator');

module.exports = {
    createLoginMiddleware: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            const loginInfo = await User.findOne({email, password}).lean();

            if (!loginInfo) {
                throw new Error('Incorrect login or password');
            }

            req.user = loginInfo;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },
    isloginBodyValid: (req, res, next) => {
        try {
            const {error, value} = loginValidator.userLoginValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },
}