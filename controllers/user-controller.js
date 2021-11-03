const User = require('../database/User');
const {jwtService, emailService, s3Service} = require('../services');
const {userService} = require('../services');

const O_Auth = require('../database/O_Auth');
const {WELCOME, UPDATE} = require('../configs/email.actions');
const {errors_code} = require('../errors');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const allUsers = await userService.getAllUsers(req.query);

            res.json(allUsers);
        } catch (e) {
            next(e);
        }

    },

    getUsersByID: (req, res, next) => {
        try {

            res.json(req.user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const {email} = req.body;

            let newUser = await User.createHashPassword(req.body);

            const {avatar} = req.files || {};

            if (avatar) {
                const uploadInfo = await s3Service.uploadImage(avatar, 'users', newUser._id.toString());

                newUser = await User.findByIdAndUpdate(newUser._id, {avatar: uploadInfo.Location}, {new: true});
            }

            await emailService.sendMail(email, WELCOME, {userName: req.body.name});

            res.status(errors_code.UPDATE_DATA).json(newUser);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            console.log(user_id);

            await User.findByIdAndUpdate(user_id, req.body);

            const tokenPair = jwtService.generateTokenPair();

            await O_Auth.create({
                ...tokenPair,
                user_id: req.user._id
            });

            const oneUser = await User.findById(req.user.id).select('-password');

            await emailService.sendMail(oneUser.email, UPDATE, {userName: oneUser.name});

            res.json({
                user: oneUser,
                ...tokenPair
            });

        } catch (e) {
            next(e);
        }
    },

};
