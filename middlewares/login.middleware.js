const User = require('../database/User');

module.exports = {
    createLoginMiddleware: async (req, res, next) => {
        try {
            const {name, email, password} = req.body;

            const loginInfo = await User.findOne({email, password});

            if (!loginInfo) {
                throw new Error('Incorrect login or password');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
}