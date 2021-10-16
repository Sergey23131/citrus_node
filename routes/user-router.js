const router = require('express').Router();

const {isUserBodyValid, checkUserRole} = require('../middlewares/user.middleware');
const idMiddleware = require('../middlewares/userID.middleware');
const updateMiddleware = require('../middlewares/user.update.middleware');
const createMiddleware = require('../middlewares/create.user.middleware');

const {ADMIN,USER} = require("../configs/user_roles");

const {userController} = require('../controllers/index');

router.post('/',
    isUserBodyValid,
    checkUserRole([ADMIN, USER]),
    createMiddleware.createUserMiddleware,
    userController.createUser);

router.get('/', userController.getUsers);

router.get('/:user_id', idMiddleware.createIDMiddleware, userController.getUsersByID);
router.delete('/:user_id', idMiddleware.createIDMiddleware, userController.deleteUser);
router.put('/:user_id', idMiddleware.createIDMiddleware, updateMiddleware.updateUserMiddleware, userController.updateUser);

module.exports = router;