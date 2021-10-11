const router = require('express').Router();

const userMiddleware = require('../middlewares/user.middleware');
const idMiddleware = require('../middlewares/userID.middleware')

const userController = require('../controllers/user-controller');

router.post('/',
    userMiddleware.createUserMiddleware,
    userMiddleware.isUserBodyValid,
    userController.createUser);

router.get('/', userController.getUsers);

router.get('/:user_id', idMiddleware.createIDMiddleware, userController.getUsersByID);
router.delete('/:user_id', idMiddleware.createIDMiddleware, userController.deleteUser);

module.exports = router;