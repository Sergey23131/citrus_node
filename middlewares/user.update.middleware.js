const userValidator = require('../validators/user.update.validator');
const {ErrorHandler, errors_massage, errors_code} = require("../errors");

module.exports={
    updateUserMiddleware: (req, res, next) => {
        try {
            const {error, value} = userValidator.updateUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errors_massage.NOT_VALID_BODY, errors_code.NOT_VALID);
            }

            req.user = value;

            next();
        } catch (e) {
           next(e);
        }
    },
}