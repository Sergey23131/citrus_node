const {passwordService, jwtService} = require("../services");
const O_Auth = require('../database/O_Auth');
const User = require('../database/User');

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
            await O_Auth.deleteOne(req.token)

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
            const removeAccount = await User.findByIdAndDelete(req.user.id).select('-password');
            await O_Auth.remove(req.token)

            res.json(removeAccount);
        } catch (e) {
            next(e);
        }
    }
};