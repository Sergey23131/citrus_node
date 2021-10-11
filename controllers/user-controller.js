const User = require('../database/User');
const passwordService = require('../services/password.service');
const userUtil = require('../util/user_util');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const allUsers = await User.find();

            res.json(allUsers);
        } catch (e) {
            res.json(e);
        }

    },

    getUsersByID: async (req, res) => {
        try {
            res.json(req.user);
        } catch (e) {
            res.json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const hashedPassword = await passwordService.hash(req.body.password);

            const newUser = await User.create({...req.body, password: hashedPassword});

            res.json(newUser);
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {user_id} = req.params;
            const removeUser = await User.findByIdAndDelete(user_id);

            res.json(removeUser);
        } catch (e) {
            res.json(e.message);
        }
    }
}
