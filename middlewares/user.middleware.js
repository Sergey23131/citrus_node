const User = require('../database/User');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const name = req.body.name;
            const email = req.body.email;
            const password = req.body.password;

            if (!name && !email && !password) {
                throw new Error('Name, email, password are required');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
}