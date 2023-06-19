const axios = require('axios');
const { Op } = require('sequelize');
const { Dog } = require('../db');
const URL = 'https://api.thedogapi.com';

const getRazaByName = async (req, res) => {
  try {
      const { name } = req.query;

      const razaAPI = await axios.get(`${URL}/v1/breeds/search?q=${name}`);
      const razaDB = await Dog.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
      });
  
      const razas = [...razaAPI.data, ...razaDB];
  
      if (razas.length === 0) {
        throw new Error(`No se encontraron razas que coincidan con "${name}".`);
      }
  
      return res.status(200).json(razas);
  } catch (error) {
      res.status(500).json({error: error.message});
  }
};

module.exports = getRazaByName;