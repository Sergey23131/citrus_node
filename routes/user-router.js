const router = require('express').Router();

const {isUserBodyValid, checkUserRole} = require('../middlewares/user.middleware');
const idMiddleware = require('../middlewares/userID.middleware');
const createMiddleware = require('../middlewares/create.user.middleware');
const loginMiddleware = require('../middlewares/login.middleware');

const {createUserValidator} = require('../validators/user.validator');
const {updateUserValidator} = require('../validators/user.update.validator');

const {ADMIN, USER} = require("../configs/user_roles");

const {userController} = require('../controllers/index');

router.post('/',
    // checkUserRole([USER, ADMIN]),
    isUserBodyValid(createUserValidator),
    createMiddleware.createUserMiddleware,
    userController.createUser);

router.get('/', userController.getUsers);

router.get('/:user_id', idMiddleware.createIDMiddleware, userController.getUsersByID);
router.put('/:user_id', isUserBodyValid(updateUserValidator), idMiddleware.createIDMiddleware, loginMiddleware.checkAccessToken, userController.updateUser);

module.exports = router;
