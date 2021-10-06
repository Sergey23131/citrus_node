const path = require('path');
const builder = require('../service/file.service');
const users = path.join(__dirname, '../', 'database', 'users-arr.json');

module.exports = {
    getUsers: async (req, res) => {
        const newUsers = await builder.readFile();
        res.json(newUsers);
    },

    getUsersByID: async (req, res) => {

        const newUsers = await builder.readFile();
        const {user_id} = req.params;


        newUsers.forEach(value => {
                if (Number(user_id) === value.id) {
                    res.json(value);
                }
            }
        );
    },

    createUser: async (req, res) => {

        const newUsers = await builder.readFile();

        newUsers.push({...newUsers, id: users.length + 1});

        await builder.writeFile(newUsers);

        res.json(newUsers)
    },

    deleteUser: async (req, res) => {

        const userList = await builder.readFile();
        const {user_id} = req.params;

        if (user_id) {
            const newUsers = userList.filter(user => user.id !== +user_id);

            await builder.writeFile(newUsers);

            res.json(newUsers);
        }
    }
}