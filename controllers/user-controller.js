const User = require('../database/User');
const passwordService = require('../services/password.service');
const userUtil = require('../util/user_util');
const {errors_code, errors_massage} = require("../errors");

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

            res.status(errors_code.UPDATE_DATA).json(errors_massage.UPDATE_DATA);
        } catch (e) {
            next(e);
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            let user = await User.findByIdAndUpdate(user_id, req.body).lean();

            res.status(errors_code.UPDATE_DATA).json(errors_massage.UPDATE_DATA);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const removeUser = await User.findByIdAndDelete(user_id).select('-password');

            res.status(errors_code.REMOVE).json(errors_massage.REMOVE_USER);
        } catch (e) {
            next(e);
        }
    }
}