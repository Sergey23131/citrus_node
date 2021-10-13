const User = require('../database/User');
const passwordService = require('../services/password.service');
const userUtil = require('../util/user_util');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const allUsers = await User.find().lean();
            let users = [];

            allUsers.forEach(user => users = [...users, userUtil.userNormalizator(user)]);

            res.json(users);

        } catch (e) {
            res.json(e);
        }

    },

    getUsersByID: async (req, res) => {
        try {
            const userNorm = userUtil.userNormalizator(req.user);

            res.json(userNorm);
        } catch (e) {
            res.json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const hashedPassword = await passwordService.hash(req.body.password);

            const newUser = await User.create({...req.body, password: hashedPassword});

            res.json(`You are our new user!`);
        } catch (e) {
            res.json(e.message);
        }
    },
    updateUser: async (req, res) => {
        try {
            const {user_id} = req.params;
            let user = await User.findByIdAndUpdate(user_id, req.user).lean();
            user = userUtil.userNormalizator(user);

            res.json(user);
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {user_id} = req.params;
            const removeUser = await User.findByIdAndDelete(user_id);

            res.json('Your account was removed');
        } catch (e) {
            res.json(e.message);
        }
    }
}