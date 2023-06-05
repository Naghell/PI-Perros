const axios = require('axios');
const URL = 'https://api.thedogapi.com'

const getRazaByID = async (req, res) => {
    try {
        const { id } = req.params;
        const { data } = await axios(`${URL}/v1/breeds/${id}`);

        if (!data.id) throw Error(`La raza con la ID: ${id} no existe.`)
    
        const raza = {
            id: data.id,
            name: data.name,
            image: data.image,
            height: data.height,
            weight: data.weight,
            life_span: data.life_span,
            temperament: data.temperament
        };
        return res.status(200).json(raza);
 
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = getRazaByID;