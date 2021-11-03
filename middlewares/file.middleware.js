const {PHOTOS_MIMETYPES, PHOTO_MAX_SIZE} = require('../configs/constants');
const {ErrorHandler, errors_massage, errors_code} = require('../errors');

module.exports = {
    checkUserAvatar: (req, res, next) => {
        try {
            const {avatar} = req.files || {};

            if (!avatar) {
                next();
                return;
            }

            const {size, mimetype} = avatar;

            if (!PHOTOS_MIMETYPES.includes(mimetype)) {
                throw new ErrorHandler(errors_massage.WRONG_FORMAT, errors_code.NOT_VALID);
            }

            if (size > PHOTO_MAX_SIZE) {
                throw new ErrorHandler(errors_massage.MAX_SIZE, errors_code.NOT_VALID);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
