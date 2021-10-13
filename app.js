const express = require('express');
const mongoose = require('mongoose');

const app = express();

const {MONGO_CONNECT_URL, PORT} = require('./configs/config')

mongoose.connect(MONGO_CONNECT_URL);

const userRouter = require('./routes/user-router');
const authRouter = require('./routes/login-router');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
})