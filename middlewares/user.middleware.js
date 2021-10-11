const userValidator = require('../validators/user.validator');

module.exports =  {
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
    },
    isUserBodyValid: (req, res, next) => {
        try {
            const {error, value} = userValidator.createUserValidator.validate(req.body);

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
