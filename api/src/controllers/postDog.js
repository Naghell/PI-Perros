const { Dog } = require('../db');

const postDog = async (req, res) => {
  try {
    const { name, weight, height, image, life_span, temperaments, createdInDb } = req.body;
    if ( !name || !weight || !height || !image || !life_span || !temperaments) {
      return res.status(400).send('Faltan datos');
    }
    const dog = await Dog.findOrCreate({
      where: {
        name,
        weight,
        height,
        image,
        life_span,
        temperaments
      }
    });
    res.status(200).json(dog);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = postDog;