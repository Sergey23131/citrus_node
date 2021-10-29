const router = require('express').Router();

const {isUserBodyValid, checkUserRole} = require('../middlewares/user.middleware');
const idMiddleware = require('../middlewares/userID.middleware');
const createMiddleware = require('../middlewares/create.user.middleware');
const loginMiddleware = require('../middlewares/login.middleware');
const fileMiddleware = require('../middlewares/file.middleware');

const {createUserValidator} = require('../validators/user.validator');
const {updateUserValidator} = require('../validators/user.update.validator');

const {userController} = require('../controllers');

router.post('/',
    isUserBodyValid(createUserValidator),
    fileMiddleware.checkUserAvatar,
    createMiddleware.createUserMiddleware,
    userController.createUser);

router.get('/', userController.getUsers);

router.get('/:user_id', idMiddleware.createIDMiddleware, userController.getUsersByID);
router.put('/:user_id', isUserBodyValid(updateUserValidator), idMiddleware.createIDMiddleware, loginMiddleware.checkAccessToken, userController.updateUser);

module.exports = router;