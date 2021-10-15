import {ErrorHandler} from "../errors";
import {NOT_VALID_BODY} from "../errors/custom_errors";

const bcrypt = require('bcrypt');

module.exports = {
    hash: (password) => {
        return bcrypt.hash(password, 10);
    },
    compare: async (password, hashPassword) => {
        const isPasswordMatched = await bcrypt.compare(password, hashPassword);

        if (!isPasswordMatched) {
            throw new ErrorHandler(NOT_VALID_BODY.message, NOT_VALID_BODY.code);
        }
    }
}