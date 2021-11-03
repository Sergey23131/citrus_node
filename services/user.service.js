const User = require('../database/User');

module.exports = {
    getAllUsers: (query = {}) => {
        const {
            perPage = 20,
            page = 1,
            sortBy = 'createdAt',
            order = 'asc',
            ...filters
        } = query;

        const findObject = {};
        const ageFilter = {};

        Object.keys(filters).forEach((filterParams) => {
            switch (filterParams) {
                case 'name':
                    findObject.name = {$regex: `^${filters.name}`, $options: 'i'};
                    break;
                case 'age.gte':
                    Object.assign(ageFilter, {$gte: +filters['age.gte']});
                    break;
                case 'age.lte':
                    Object.assign(ageFilter, {$lte: +filters['age.gte']});
                    break;

            }
        });

        if (Object.values(ageFilter).length) {
            findObject.age = ageFilter;
        }

        const orderBy = order === 'asc' ? -1 : 1;

        return User.find(findObject)
            .select('-password')
            .sort({[sortBy]: orderBy})
            .limit(+perPage)
            .skip((page - 1) * perPage);
    }
};
