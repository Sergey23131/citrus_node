const User = require('../database/User');

module.exports = {
    getAllUsers: (query = {}) => {
        return User.find().select('-password');
    }
}