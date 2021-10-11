const passwordService = require('../services/password.service');
const User = require('../database/User');

module.exports = {
    logUser: async (req, res) => {
        try {
            const hashedPassword = await passwordService.hash(req.user.password);

            const comparePassword = await passwordService.hash(req.body.password, hashedPassword);

            if (comparePassword) {
                res.json('You is our user!')
            }

        } catch (e) {
            res.json(e.message);
        }
    }
};