const {passwordService, jwtService, emailService} = require("../services");
const O_Auth = require('../database/O_Auth');
const User = require('../database/User');
const {UPDATE, LOGOUT, DELETE} = require("../configs/email.actions");
const {errors_code, errors_massage} = require("../errors");

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
    }
};