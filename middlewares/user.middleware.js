const userValidator = require('../validators/user.validator');
const userValidator_UP = require('../validators/user.update.validator');

const {ErrorHandler, errors_massage, errors_code} = require("../errors");

module.exports = {
    isUserBodyValid: (req, res, next) => {
        try {
            if (req.body.name && req.body.email && req.body.password) {
                const {error, value} = userValidator.createUserValidator.validate(req.body);

                if (error) {
                    throw new ErrorHandler(errors_massage.NOT_VALID_BODY, errors_code.NOT_VALID);
                }

                req.body = value;
            }

            if (req.body.name && !req.body.email) {
                const {error, value} = userValidator_UP.updateUserValidator.validate(req.body);

                if (error) {
                    throw new ErrorHandler(errors_massage.NOT_VALID_BODY, errors_code.NOT_VALID);
                }

                req.body = value;
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    checkUserRole: (roleArr = []) => (req, res, next) => {
        try {
            const {role} = req.body;

            if (!roleArr.includes(role)) {
                throw new ErrorHandler(errors_massage.ACCESS, errors_code.ACCESS);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}
