const { User } = require('../db');

const login = async (req, res) => {
    try {
        const {email, password} = req.query;
        if (!email || !password) {
            res.status(400).send('Faltan datos');
        }
        const user = await User.findOne({
            where: {
                email
            }
        })
        if (!user) {
            res.status(400).send('Usuario no encontrado');
        }
        return user.password === password ? res.status(200).json({access: true}) : res.status(403).send('Contraseña incorrecta');
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
};

module.exports = login;