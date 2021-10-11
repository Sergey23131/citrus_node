const userValidator = require('../validators/user.update.validator');

module.exports={
    updateUserMiddleware: (req, res, next) => {
        try {
            const { email, password, auth} = req.body;

            if ( email || password || auth ) {
                throw new Error('You are able to change only name!');
            }

            const {error, value} = userValidator.updateUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.user = value;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },
}