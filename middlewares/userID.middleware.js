

const User = require('../database/User');

const {NOT_FOUND_BY_ID} = require("../errors/custom_errors");
const {ErrorHandler} = require("../errors");

module.exports = {
    createIDMiddleware: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const oneUser = await User.findById(user_id).select('-password');

            if (!oneUser) {
                throw new ErrorHandler(NOT_FOUND_BY_ID.message, NOT_FOUND_BY_ID.code);;
            }

            req.user = oneUser;

            next();
        } catch (e) {
           next(e);
        }
    }
}