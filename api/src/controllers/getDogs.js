const axios = require('axios');
const URL = 'https://api.thedogapi.com'


const getDogs = async (req, res) => {
    try {
        const { data } = await axios.get(`${URL}/v1/breeds`);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

module.exports = getDogs;