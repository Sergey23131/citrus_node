const User = require('../database/User');

module.exports = {
    createIDMiddleware: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const oneUser = await User.findById(user_id);

            if (!oneUser) {
                throw new Error(`User with id: ${user_id} isn't exist`);
            }

            req.user = oneUser;

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
}