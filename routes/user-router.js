const router = require('express').Router();

const userController = require('../controllers/user-controller');

router.get('/:user_id', userController.getUsersByID);

router.delete('/:user_id', userController.deleteUser);

router.post('/', userController.createUser);

router.get('/', userController.getUsers);

module.exports = router;