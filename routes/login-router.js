const authRouter = require('express').Router();

const loginController = require('../controllers/user-login');
const loginMiddleware = require('../middlewares/login.middleware');

authRouter.post('/', loginMiddleware.isloginBodyValid, loginMiddleware.createLoginMiddleware, loginController.logUser);

module.exports = authRouter;