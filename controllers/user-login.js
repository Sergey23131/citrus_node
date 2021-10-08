module.exports = {
    logUser: (req, res) => {
        try {
            const username = req.body.name;

            res.json(`${username} molodec`);
        } catch (e) {
            res.json(e.message);
        }
    }
};