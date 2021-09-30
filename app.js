const fs = require('fs');
const path = require('path');

const boys = path.join(__dirname, 'users', 'boys');
const girls = path.join(__dirname, 'users', 'girls')

const sortPeople = (gender, currentLink, futureLink) => {

    fs.readdir(currentLink, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        data.forEach(value => {
            fs.readFile(path.join(currentLink, value), (err1, data) => {
                if (err1) {
                    console.log(err1);
                    return;
                }

                const curr = path.join(currentLink, value);
                const future = path.join(futureLink, value);
                const user = JSON.parse(data.toString());

                if (user.gender === gender) {
                    fs.rename(curr, future, err3 => {
                        if (err3) {
                            console.log(err3);
                        }
                    })
                }
            })
        })
    })
}

sortPeople('male', girls, boys);
sortPeople('female', boys, girls)
