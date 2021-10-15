import {ErrorHandler} from "../errors";
import {NOT_FOUND_BY_ID} from "../errors/custom_errors";

const User = require('../database/User');

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