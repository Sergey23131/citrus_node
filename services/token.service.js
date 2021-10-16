const jwt = require('jsonwebtoken');

const {NOT_VALID_TOKEN} = require("../errors/custom_errors");
const {ErrorHandler} = require("../errors");

const {JWT_ACCESS_SECRET, JWT_REFRESH_SECRET} = require('../configs/config')
const tokenType = require('../configs/token.type.enum');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, JWT_ACCESS_SECRET, {expiresIn: '15m'});
        const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, {expiresIn: '30d'});

        return {
            access_token,
            refresh_token
        }
    },

    verifyToken: async (token, tokenType = tokenType.ACCESS) => {
        try {
            const secret = tokenType === tokenType.ACCESS ? 'xxx' : 'zzz';

            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code)
        }
    }
}