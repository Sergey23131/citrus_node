const User = require('../database/User');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const userEmail = await User.findOne({email: req.body.email});

            if (userEmail) {
                throw new Error('Email already exists');
            }
            if (req.body.name && req.body.email && req.body.password) {
                res.json(`${req.body.name} molodec`);
            } else if (!req.body.name || !req.body.email || !req.body.password) {
                throw new Error('Name, email, password are required');
            }


            next();
        } catch (e) {
            res.json(e.message);
        }
    }

}