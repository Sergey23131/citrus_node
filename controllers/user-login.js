module.exports = {
    logUser: (req, res) => {
        try {

            res.json(`You passed authorization`);
        } catch (e) {
            res.json(e.message);
        }
    }
};