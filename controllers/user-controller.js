const builder = require('../service/file.service');

module.exports = {
    getUsers: async (req, res) => {
        const newUsers = await builder.readFile();
        res.json(newUsers);
    },

    getUsersByID: async (req, res) => {
        const newUsers = await builder.readFile();
        const {user_id} = req.params;
        const user = newUsers.find(value => value.id === +user_id);

        res.json(user);
    },

    createUser: async (req, res) => {
        const newUsers = await builder.readFile();

        newUsers[newUsers.length] = {...req.body, id: newUsers[newUsers.length - 1].id + 1}

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