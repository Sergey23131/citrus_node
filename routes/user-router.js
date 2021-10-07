const router = require('express').Router();

const userController = require('../controllers/user-controller');
const userMiddleware = require('../middlewares/user.middleware');

router.get('/:user_id', userController.getUsersByID);

router.delete('/:user_id', userController.deleteUser);

router.post('/', userMiddleware.createUserMiddleware, userController.createUser);

router.get('/', userController.getUsers);

module.exports = router;