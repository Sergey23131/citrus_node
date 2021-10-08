const User = require('../database/User')

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
            const {user_id} = req.params;
            const oneUser = await User.findById(user_id);

            res.json(oneUser);
        } catch (e) {
            res.json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const newUser = await User.create(req.body);

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