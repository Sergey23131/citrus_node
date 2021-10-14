const passwordService = require('../services/password.service');
const User = require('../database/User');

module.exports = {
    logUser: async (req, res) => {
        try {
            const {password} = req.body;
            const hashPassword = req.user;

            await passwordService.compare(password, hashPassword.password);

            res.json(req.user);
        } catch (e) {
            res.json(e.message);
        }
    }
};
