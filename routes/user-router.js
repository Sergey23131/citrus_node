const router = require('express').Router();

const userController = require('../controllers/user-controller');
const userMiddleware = require('../middlewares/user.middleware');

const loginMiddleware = require('../middlewares/login.middleware');
const loginController = require('../controllers/user-login');

router.post('/', userMiddleware.createUserMiddleware, userController.createUser);
router.get('/', userController.getUsers);

router.get('/:user_id', userController.getUsersByID);
router.delete('/:user_id', userController.deleteUser);

router.post('/login', loginMiddleware.createLoginMiddleware, loginController.logUser);


module.exports = router;