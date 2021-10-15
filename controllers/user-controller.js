const User = require('../database/User');
const passwordService = require('../services/password.service');
const userUtil = require('../util/user_util');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const allUsers = await User.find().select('-password')

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
            const hashedPassword = await passwordService.hash(req.body.password);

            const newUser = await User.create({...req.body, password: hashedPassword});

            res.json(`You are our new user!`);
        } catch (e) {
            next(e);
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            let user = await User.findByIdAndUpdate(user_id, req.user).lean();
            user = userUtil.userNormalizator(user);

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const removeUser = await User.findByIdAndDelete(user_id).select('-password');

            res.json(removeUser);
        } catch (e) {
            next(e);
        }
    }
}