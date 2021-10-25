const O_Auth = require('../database/O_Auth');

const dayJS = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayJS.extend(utc);

module.exports = async () => {
    const previousMonth = dayJS.utc().subtract(1, 'month')

    const deleteInfo = await O_Auth.deleteMany({
        createdAt: {$gt: previousMonth}
    });
}