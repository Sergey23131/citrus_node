const {passwordService, jwtService} = require("../services");
const O_Auth = require('../database/O_Auth');

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

            res.json('Your account removed')
        } catch (e) {
            next(e);
        }
    }
};