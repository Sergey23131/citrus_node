const User = require('../database/User');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;

            const loginInfo = await User.findOne({email});

            if (loginInfo) {
                throw new Error('This email was used before by someone');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
}