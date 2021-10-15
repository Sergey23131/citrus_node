const authRouter = require('express').Router();

const {authController} = require('../controllers/index');
const loginMiddleware = require('../middlewares/login.middleware');

authRouter.post('/', loginMiddleware.isloginBodyValid, loginMiddleware.createLoginMiddleware, authController.logUser);

module.exports = authRouter;