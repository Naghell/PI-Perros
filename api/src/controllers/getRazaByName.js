const axios = require('axios');
const URL = 'https://api.thedogapi.com'

const getRazaByName = async (req, res) => {
    try {
        const { name } = req.params;
        const { data } = await axios(`${URL}/v1/breeds/search?q=${name}`);

        if (data.length === 0) {
            throw Error('Error')
        }
        return res.status(200).json(data);
 
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = getRazaByName;