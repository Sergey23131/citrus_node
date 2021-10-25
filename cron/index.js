const cron = require('node-cron');

const removeOldTokens = require('./removeOldTokens');

module.exports = () => {
    cron.schedule('*/10 * * * * *', async () => {
        console.log(new Date().toISOString());
        await removeOldTokens()
    })
}