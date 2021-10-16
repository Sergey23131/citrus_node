const authRouter = require('express').Router();

const {authController} = require('../controllers/index');
const loginMiddleware = require('../middlewares/login.middleware');
const idMiddleware = require("../middlewares/userID.middleware");

authRouter.post('/', loginMiddleware.isloginBodyValid, loginMiddleware.createLoginMiddleware, authController.logUser);

authRouter.delete('/:user_id', idMiddleware.createIDMiddleware, loginMiddleware.checkAccessToken, authController.deleteAccount);

module.exports = authRouter;