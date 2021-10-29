const userRoles = require('../configs/user_roles');
const {Schema, model} = require('mongoose');
const passwordService = require('../services/password.service');

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
    },
    avatar:{
        type:String
    }
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

userSchema.statics = {
    async createHashPassword(userObject) {
        const hashedPassword = await passwordService.hash(userObject.password);

        return this.create({...userObject, password: hashedPassword});
    },

    async updateHashPassword(user, newPassword) {
        const password = await passwordService.hash(newPassword);

        await this.updateOne({_id: user.user_id.id}, {$set: { password }});
    }
}

module.exports = model('user', userSchema);