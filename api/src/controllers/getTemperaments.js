const axios = require('axios');
const { Temperament } = require('../db');
const URL = 'https://api.thedogapi.com';

const getTemperaments = async (req, res) => {
  try {
    const { data } = await axios.get(`${URL}/v1/breeds`);
    const temperamentsSet = new Set();

    data.forEach(raza => {
      if (raza.temperament) {
        const razaTemperaments = raza.temperament.split(", ");
        razaTemperaments.forEach(async temperamento => {
          temperamentsSet.add(temperamento);
          await Temperament.findOrCreate({
            where: {
              name: temperamento
            }
          });
        });
      };
    });

    const temperaments = Array.from(temperamentsSet).sort();

    return res.status(200).json(temperaments);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  };
};

module.exports = getTemperaments;