const User = require('../database/User');
const loginValidator = require('../validators/login.validator');

module.exports = {
    createLoginMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;

            const loginInfo = await User.findOne({email});

            if (!loginInfo) {
                throw new Error('Wrong email or password1');
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
                throw new Error('Wrong email or password2');
            }

            req.body = value;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },
}