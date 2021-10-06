const fs = require('fs');
const path = require('path');
const {promisify} = require('util');

const users = path.join(__dirname, '../', 'database', 'users-arr.json');

async function readFile() {
    const readFile_p = promisify(fs.readFile);
    const fileInfo = await readFile_p(users);

    return JSON.parse(fileInfo.toString());
}

async function writeFile(info) {
    const writeFile_p = promisify(fs.writeFile);

    const fileInfo = JSON.stringify(info);

    await writeFile_p(users, fileInfo);
}


module.exports = {
    readFile,
    writeFile
};