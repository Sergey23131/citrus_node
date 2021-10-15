const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const {MONGO_CONNECT_URL, PORT} = require('./configs/config')

mongoose.connect(MONGO_CONNECT_URL);

const {userRouter, authRouter} = require('./routes/index');

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
})