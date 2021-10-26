const User = require('../database/User');

module.exports = {
    getAllUsers: (query = {}) => {
        const {
            perPage = 20,
            page = 1,
            sortBy = 'createdAt',
            order = 'asc',
            ...filters
        } = query

        const findObject = {}

        Object.keys(filters).forEach((filterParams) => {
                switch (filterParams) {
                    case 'name':
                        break;

                }
            }
        )

        const orderBy = order === 'asc' ? -1 : 1;

        return User.find(findObject)
            .select('-password')
            .sort({[sortBy]: orderBy})
            .limit(+perPage)
            .skip((page - 1) * perPage);
    }
}