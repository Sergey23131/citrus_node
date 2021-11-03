const jwt = require('jsonwebtoken');

const {JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, JWT_FORGOT_PASSWORD} = require('../configs/config');
const {ACCESS} = require('../configs/token.type.enum');
const {REFRESH} = require('../configs/token.type.enum');
const {FORGOT_PASSWORD} = require('../configs/action-token-type');
const {ErrorHandler, errors_massage, errors_code} = require('../errors');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, JWT_ACCESS_SECRET, {expiresIn: '15m'});
        const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, {expiresIn: '30d'});

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenTypes = ACCESS) => {
        try {
            let secret;

            switch (tokenTypes) {
                case ACCESS:
                    secret = JWT_ACCESS_SECRET;
                    break;
                case REFRESH:
                    secret = JWT_REFRESH_SECRET;
                    break;
                case FORGOT_PASSWORD:
                    secret = JWT_FORGOT_PASSWORD;
                    break;
                default:
                    throw new ErrorHandler(errors_massage.NOT_VALID_TOKEN, errors_code.NOT_VALID);
            }

            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler(errors_massage.NOT_VALID_TOKEN, errors_code.NOT_VALID);
        }
    },

    generateActionToken: (actionTokenType) => {

        let secretWord;

        switch (actionTokenType) {
            case FORGOT_PASSWORD:
                secretWord = JWT_FORGOT_PASSWORD;// TODO from config
                break;
            default:
                throw new ErrorHandler(errors_massage.WRONG_TOKEN, errors_code.WRONG_TOKEN);
        }

        return jwt.sign({}, secretWord, {expiresIn: '24h'});
    }

};
