const router = require('express').Router();

const userController = require('../controllers/user-controller');

router.get('/:user_id', userController.getUsers);

router.post('/', userController.createUser);

router.delete('/:user_id', userController.deleteUser);

module.exports = router;