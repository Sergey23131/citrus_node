const User = require('../database/User');
const loginValidator = require('../validators/login.validator');

const {jwtService} = require("../services");
const {AUTHORIZATION} = require("../configs/constants");
const tokenType = require('../configs/token.type.enum');
const O_Auth = require('../database/O_Auth');
const {FORGOT_PASSWORD} = require("../configs/action-token-type");

const ActionToken = require('../database/ActionToken');

const {ErrorHandler, errors_massage, errors_code} = require("../errors");

module.exports = {
    createLoginMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;

            const loginInfo = await User.findOne({email});

            if (!loginInfo) {
                throw new ErrorHandler(errors_massage.NOT_VALID_BODY, errors_code.NOT_VALID);
            }

            req.user = loginInfo;

            next();
        } catch (e) {
            next(e);
        }
    },

    isloginBodyValid: (req, res, next) => {
        try {
            const {error, value} = loginValidator.userLoginValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errors_massage.NOT_VALID_BODY, errors_code.NOT_VALID);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    sendMailForgotPassword: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await User.findOne({email});

            if (!user) {
                throw ErrorHandler(errors_massage.FORGOT_PASSWORD, errors_code.NOT_FOUND);
            }

            const actionToken = jwtService.generateActionToken(FORGOT_PASSWORD);

            await ActionToken.create({
                token: actionToken,
                token_type: FORGOT_PASSWORD,
                user_id: user._id
            })

            req.token = actionToken;

            next()
        } catch (e) {
            next(e);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(errors_massage.NOT_VALID_TOKEN, errors_code.NOT_VALID);
            }

            await jwtService.verifyToken(token);

            const tokenResponse = await O_Auth
                .findOne({access_token: token})
                .populate('user_id');

            if (!tokenResponse) {
                throw new ErrorHandler(errors_massage.NOT_VALID_TOKEN, errors_code.NOT_VALID);
            }

            req.user = tokenResponse.user_id
            req.token = token;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(errors_massage.NOT_VALID_TOKEN, errors_code.NOT_VALID);
            }

            await jwtService.verifyToken(token, tokenType.REFRESH);

            const tokenResponse = await O_Auth
                .findOne({refresh_token: token});

            if (!tokenResponse) {
                throw new ErrorHandler(errors_massage.NOT_VALID_TOKEN, errors_code.NOT_VALID);
            }

            await O_Auth.findOneAndDelete({refresh_token: token});

            req.token = token;
            req.user = tokenResponse.user_id;

            next();
        } catch (e) {
            next(e);
        }
    }
}