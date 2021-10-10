const User = require('../database/User');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const {name, email, password} = req.body;

            if (!name || !email || !password) {
                throw new Error('Name, email, password are required');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
}