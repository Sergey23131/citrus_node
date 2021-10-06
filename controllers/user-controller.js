/*const db = require('../database/users-arr');*/
const fs = require('fs');
const path = require('path');

const users = path.join(__dirname, '../', 'database', 'users-arr.json');

module.exports = {
    getUsers: (req, res) => {
        fs.readFile(path.join(users), (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            const user = JSON.parse(data.toString());
            const {user_id} = req.params;

            user.forEach(value => {
                    if (Number(user_id) === value.id) {
                        res.json(value);
                    }
                }
            );
        });
    },

    createUser: (req, res) => {
        fs.readFile(path.join(users), (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            const user = JSON.parse(data.toString());

            user[user.length + 1] = {...req.body, id: user.length + 1}
            const usersToString = JSON.stringify(user);

            res.json(user)

            fs.writeFile(users, user, (err) => {
                if (err) {
                    console.log(err);
                    return;
                }
            });
        });

    },

    deleteUser: (req, res) => {
        fs.readFile(path.join(users), (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            const user = JSON.parse(data.toString());
            const {user_id} = req.params;

            if (user_id) {
                const newUsers = user.filter(user => user.id !== +user_id);
                const usersToString = JSON.stringify(newUsers);

                fs.writeFile(users, usersToString, (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                })
                res.json(usersToString);
            }
        })

    },

}