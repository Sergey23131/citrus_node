const User = require('../database/User');

module.exports = {
    getAllUsers: (query = {}) => {
        console.log(query);
        return User.find().select('-password');
    }

}