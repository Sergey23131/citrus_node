const User = require('../database/User');
const {passwordService, jwtService, emailService} = require("../services");
const userService=require('../services/user.service');

const O_Auth = require('../database/O_Auth');
const {WELCOME, UPDATE} = require('../configs/email.actions');
const {errors_code, errors_massage} = require('../errors');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const allUsers = userService.getAllUsers(req.query);

            res.json(allUsers);
        } catch (e) {
            next(e);
        }

    },

    getUsersByID: async (req, res, next) => {
        try {

            res.json(req.user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const {email} = req.body

            await User.createHashPassword(req.body);

            await emailService.sendMail(email, WELCOME, {userName: req.body.name});

            res.status(errors_code.UPDATE_DATA).json(errors_massage.UPDATE_DATA);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            console.log(user_id)

            await User.findByIdAndUpdate(user_id, req.body);

            const tokenPair = jwtService.generateTokenPair();

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

}
