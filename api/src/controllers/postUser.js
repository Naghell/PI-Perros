const { User } = require('../db')
const postUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).send('Faltan datos')
        }

        const user = await User.findOrCreate({
            where: {
                email,
                password
            }
        })
        res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = postUser;