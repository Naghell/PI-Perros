const axios = require("axios");
const URL = "https://api.thedogapi.com";
const { Dog } = require("../db");

const getRazaByID = async (req, res) => {
  try {
    const { id } = req.params;
    let raza;

    // Verificar si el ID es un número entero o un UUIDv4
    if (Number.isInteger(Number(id))) {
      // Consultar en la API externa
      const response = await axios(`${URL}/v1/breeds/${id}`);
      const razaAPI = response.data;

      if (!razaAPI.id) {
        throw new Error(`La raza con la ID: ${id} no existe.`);
      }

      raza = {
        id: razaAPI.id,
        name: razaAPI.name,
        image: `https://cdn2.thedogapi.com/images/${razaAPI.reference_image_id}.jpg`,
        height: razaAPI.height,
        weight: razaAPI.weight,
        life_span: razaAPI.life_span,
        temperament: razaAPI.temperament,
      };
    } else {
      // Consultar en la base de datos local
      const razaDB = await Dog.findOne({
        where: {
          id: id,
        },
      });

      if (!razaDB) {
        throw new Error(`La raza con la ID: ${id} no existe.`);
      }

      raza = {
        id: razaDB.id,
        name: razaDB.name,
        image: razaDB.image,
        height: razaDB.height,
        weight: razaDB.weight,
        life_span: razaDB.life_span,
        temperament: razaDB.temperament.join(", ")
      };
    }

    return res.status(200).json(raza);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getRazaByID;
