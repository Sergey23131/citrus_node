const authRouter = require('express').Router();

const {authController} = require('../controllers/index');
const loginMiddleware = require('../middlewares/login.middleware');


authRouter.post('/', loginMiddleware.isloginBodyValid, loginMiddleware.createLoginMiddleware, authController.logUser);
authRouter.delete('/', loginMiddleware.checkAccessToken, authController.deleteAccount);

authRouter.post('/refresh', loginMiddleware.checkRefreshToken, authController.refreshToken);

authRouter.delete('/logout', loginMiddleware.checkAccessToken, authController.logOut);

module.exports = authRouter;