const userValidator = require('../validators/user.update.validator');

module.exports={
    updateUserMiddleware: (req, res, next) => {
        try {
            const {error, value} = userValidator.updateUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.user = value;

            next();
        } catch (e) {
           next(e);
        }
    },
}