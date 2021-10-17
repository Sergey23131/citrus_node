const User = require('../database/User');
const loginValidator = require('../validators/login.validator');
const {jwtService} = require("../services");
const {AUTHORIZATION} = require("../configs/constants");
const O_Auth = require('../database/O_Auth');
const tokenType = require('../configs/token.type.enum');

const {ACCESS} = require("../errors/custom_errors");
const {NOT_VALID_BODY} = require("../errors/custom_errors");
const {ErrorHandler} = require("../errors/");


module.exports = {
    createLoginMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;

            const loginInfo = await User.findOne({email});

            if (!loginInfo) {
                throw new ErrorHandler(NOT_VALID_BODY.message, NOT_VALID_BODY.code);
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
                throw new ErrorHandler(ACCESS.message, ACCESS.code);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(NOT_VALID_BODY.message, NOT_VALID_BODY.code);
            }

            await jwtService.verifyToken(token);

            const tokenResponse = await O_Auth
                .findOne({access_token: token})
                .populate('user_id');

            if (!tokenResponse) {
                throw new ErrorHandler(NOT_VALID_BODY.message, NOT_VALID_BODY.code);
            }

            req.user = tokenResponse.user_id

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(NOT_VALID_BODY.message, NOT_VALID_BODY.code);
            }

            await jwtService.verifyToken(token, tokenType.REFRESH);

            const tokenResponse = await O_Auth
                .findOne({refresh_token: token})
                .populate('user_id');

            if (!tokenResponse) {
                throw new ErrorHandler(NOT_VALID_BODY.message, NOT_VALID_BODY.code);
            }

            await O_Auth.remove({refresh_token: token});

            req.token = token;
            req.user = tokenResponse.user_id;

            next();
        } catch (e) {
            next(e);
        }
    }

}