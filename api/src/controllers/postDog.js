const { Dog } = require('../db');

const postDog = async (req, res) => {
  try {
    const { name, weight, height, image, life_span, temperament, createdInDb } = req.body;
    if ( !name || !weight || !height || !image || !life_span || !temperament) {
      return res.status(400).send('Faltan datos');
    }
    const dog = await Dog.findOrCreate({
      where: {
        name,
        weight,
        height,
        image,
        life_span: `${life_span} years`,
        temperament
      }
    });
    res.status(200).json(dog);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = postDog;