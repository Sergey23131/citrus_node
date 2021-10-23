const {passwordService, jwtService, emailService} = require("../services");
const O_Auth = require('../database/O_Auth');
const User = require('../database/User');
const {FORGOT_PASSWORD} = require("../configs/email.actions");
const {UPDATE, LOGOUT, DELETE} = require("../configs/email.actions");
const {errors_code, errors_massage} = require("../errors");
const {AUTHORIZATION} = require("../configs/constants");

const ActionToken = require('../database/ActionToken');


module.exports = {
    logUser: async (req, res, next) => {
        try {
            const {password} = req.body;
            const hashPassword = req.user;

            const tokenPair = jwtService.generateTokenPair();

            await passwordService.compare(password, hashPassword.password);

            await O_Auth.create({
                ...tokenPair,
                user_id: req.user._id
            })

            const oneUser = await User.findById(req.user.id).select('-password');

            await emailService.sendMail(oneUser.email, UPDATE, {userName: oneUser.name});

            res.json({
                user: oneUser,
                ...tokenPair
            })

        } catch (e) {
            next(e);
        }
    },

    logOut: async (req, res, next) => {
        try {
            const user = req.user;

            await O_Auth.findOneAndDelete(req.token)

            await emailService.sendMail(user.email, LOGOUT, {userName: user.name});

            res.json('logOut');
        } catch (e) {
            next(e);
        }

    },

    refreshToken: async (req, res, next) => {
        try {
            const tokenPair = jwtService.generateTokenPair();

            await O_Auth.create({
                ...tokenPair,
                user_id: req.user._id
            })

            res.json({
                user: req.user,
                ...tokenPair
            })

        } catch (e) {
            next(e);
        }
    },

    deleteAccount: async (req, res, next) => {
        try {
            const user = req.user;

            await User.findByIdAndDelete(req.user.id).select('-password');
            await O_Auth.findOneAndDelete(req.token)

            await emailService.sendMail(user.email, DELETE, {userName: user.name});

            res.status(errors_code.REMOVE).json(errors_massage.REMOVE_USER);
        } catch (e) {
            next(e);
        }
    },
    sendMailForgotPassword: async (req, res, next) => {
        try {
            const {email} = req.body;

            await emailService.sendMail(email, FORGOT_PASSWORD, {forgotPasswordUrl: `http://loclalhost:5000/auth/password/forgot/set?token=${req.token}`});

            res.status(errors_code.UPDATE_DATA).json(req.token);
        } catch (e) {
            next(e);
        }
    },
    setNewPassword: async (req, res, next) => {
        try {

            const {newPassword} = req.body;

            const actionToken = req.get(AUTHORIZATION);

          // await jwtService.verifyToken(actionToken);

            const user = await ActionToken.findOne({token: actionToken});

            await ActionToken.findOneAndDelete(actionToken);

            await User.updateHashPassword(user, newPassword);

            await O_Auth.deleteMany({user_id: user.id});

            res.status(errors_code.UPDATE_DATA).json(errors_massage.UPDATE_DATA);
        } catch (e) {
            next(e);
        }
    },
};