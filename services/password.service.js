const bcrypt = require('bcrypt');

const {NOT_VALID_BODY} = require("../errors/custom_errors");
const {ErrorHandler} = require("../errors");

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