const express = require('express');
const mongoose = require('mongoose');

const app = express();

const {MONGO_CONNECT_URL, PORT} = require('./configs/config')

mongoose.connect(MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({extended: true}))

const userRouter = require('./routes/user-router');

app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`)
})