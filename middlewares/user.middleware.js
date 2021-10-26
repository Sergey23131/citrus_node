const {ErrorHandler, errors_massage, errors_code} = require("../errors");

module.exports = {
    isUserBodyValid: (validation) => (req, res, next) => {
        try {

            const {error, value} = validation.validate(req.body);

            if (error) {
                throw new ErrorHandler(errors_code.NOT_VALID, errors_massage.NOT_VALID_BODY);
            }

            req.body = value;

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
