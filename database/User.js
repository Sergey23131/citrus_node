const userRoles = require('../configs/user_roles');
const {Schema, model} = require('mongoose');
const {passwordService} = require('../services');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    role: {
        type: String,
        default: userRoles.USER,
        enum: Object.values(userRoles)
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

userSchema.statics = {
    async createHashPassword(userObject) {
        const hashedPassword = await passwordService.hash(userObject.password);

        return this.create({...userObject, password: hashedPassword});
    },

    async updateHashPassword(user, password) {
        const hashedPassword = await passwordService.hash(password);

        return this.findByIdAndUpdate({_id: user._id}, {password: hashedPassword}, {new: true});
    }
}

module.exports = model('user', userSchema);