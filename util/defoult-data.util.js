const User = require('../database/User');
const {ADMIN} = require('../configs/user_roles');

module.exports = async () => {
    const user = await User.findOne({role: ADMIN});

    if (!user) {
        await User.createHashPassword({
            name: 'User',
            email: 'user.admin@site.com',
            password: 'Admin_password',
            role: ADMIN
        });
    }
};
