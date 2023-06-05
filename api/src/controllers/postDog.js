const { Dog } = require('../db');

const postDog = async (req, res) => {
  try {
    const { id, name, weight, height, image, life_span, temperament } = req.body;
    if (!id || !name || !weight || !height || !image || !life_span || !temperament) {
      return res.status(400).send('Faltan datos');
    }
    const dog = await Dog.findOrCreate({
      where: {
        id: id,
        nombre: name,
        peso: weight,
        altura: height,
        imagen: image,
        anios_vida: life_span,
        temperamento: temperament
      }
    });
    res.status(200).json(dog);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = postDog;