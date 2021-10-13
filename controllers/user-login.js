const passwordService = require('../services/password.service');
const User = require('../database/User');

module.exports = {
    logUser: async (req, res) => {
        try {
            const {password} = req.body;
            const hashPassword = req.user;

            const comparePassword = await passwordService.compare(password, hashPassword.password);

            if (comparePassword) {
                res.json('You is our user!')
            }

        } catch (e) {
            res.json(e.message);
        }
    }
};