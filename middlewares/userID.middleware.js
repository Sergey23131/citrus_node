const User = require('../database/User');

const {ErrorHandler, errors_massage, errors_code} = require("../errors");


module.exports = {
    createIDMiddleware: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const oneUser = await User.findById(user_id).select('-password');

            if (!oneUser) {
                throw new ErrorHandler(errors_massage.NOT_FOUND_BY_ID.message, errors_code.NOT_FOUND.code);
                ;
            }

            req.user = oneUser;

            next();
        } catch (e) {
            next(e);
        }
    }
}