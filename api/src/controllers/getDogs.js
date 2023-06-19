const axios = require('axios');
const { Dog } = require('../db');
const URL = 'https://api.thedogapi.com';

const getDogs = async (req, res) => {
  try {
    const { data } = await axios.get(`${URL}/v1/breeds`);

    // Obtiene los perros de tu base de datos
    const dogsFromDB = await Dog.findAll();

    // Combina los perros de la API y los perros de tu base de datos
    const dogs = [
      ...data,
      ...dogsFromDB
    ];

    return res.status(200).json(dogs);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = getDogs;
