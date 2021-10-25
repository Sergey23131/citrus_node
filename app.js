const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit')

const {ErrorHandler} = require("./errors");
const {MONGO_CONNECT_URL, PORT, ALLOWED_ORIGIN, NODE_ENV} = require('./configs/config');
const startCron = require('./cron');
const checkDefaultData = require('./util/defoult-data.util');

const app = express();

mongoose.connect(MONGO_CONNECT_URL);
app.use(helmet());
app.use(cors({origin: _configureCors}));

app.use(rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 100 //limit each IP to 100 requests per windowsMs
}));

if (NODE_ENV === 'dev') {
    const morgan = require('morgan');

    app.use(morgan('dev'));
}

const {userRouter, authRouter} = require('./routes');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            message: err.message
        });
});

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
    checkDefaultData();
    startCron();
})

function _configureCors(origin, callback) {

    if (NODE_ENV === 'dev') {
        return callback(null, true);
    }

    const whitelist = ALLOWED_ORIGIN.split(';');

    if (!whitelist.includes(origin)) {
        return callback(new ErrorHandler('Cors is not allowed'), false);
    }
    return callback(null, true);
}