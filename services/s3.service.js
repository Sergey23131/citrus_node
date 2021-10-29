const S3 = require('aws-sdk/clients/s3');
const path = require('path');
const uuid = require('uuid').v1; //Генерация fileName

const {AWS_S3_REGION, AWS_S3_NAME, AWS_S3_SECRET_KEY, AWS_S3_ACCESS_KEY} = require('../configs/config');

const bucket = new S3({
    region: AWS_S3_REGION,
    accessKeyId: AWS_S3_ACCESS_KEY,
    secretAccessKey: AWS_S3_SECRET_KEY
});

module.exports = {
    uploadImage: (file = {}, itemType, itemId) => {

        const {name, data, mimetype} = file;
        const uploadPass = _filenameBuilder(name, itemType, itemId);

        return bucket.upload({
            Bucket: AWS_S3_NAME,
            Body: data,
            Key: uploadPass,
            ContentType: mimetype
        }).promise();
    }
};

function _filenameBuilder(fileName, itemType, itemId) {
    //const filExtension=fileName.split('.').pop()
    const filExtension = path.extname(fileName);

    return path.join(itemType, itemId, `${uuid()}${filExtension}`)
}